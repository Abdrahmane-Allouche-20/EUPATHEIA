import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    
    let name: string;
    let email: string;
    let password: string;
    let avatarFile: File | null = null;

    // Handle FormData (with file upload)
    if (contentType.includes('multipart/form-data')) {
      const data = await request.formData();
      name = data.get('name') as string;
      email = data.get('email') as string;
      password = data.get('password') as string;
      avatarFile = data.get('avatar') as File | null;
    } 
    // Handle JSON (without file upload)
    else {
      const body = await request.json();
      name = body.name;
      email = body.email;
      password = body.password;
      // No avatar file in JSON requests
    }

    console.log('Content-Type:', contentType);
    console.log('Received data:', { name, email, hasAvatar: !!avatarFile });

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    let imageUrl = null;

    // Handle avatar upload if provided
    if (avatarFile && avatarFile.size > 0) {
      // Validate file type
      if (!avatarFile.type.startsWith('image/')) {
        return NextResponse.json(
          { error: 'Avatar must be an image file' },
          { status: 400 }
        );
      }

      // Validate file size (5MB max)
      if (avatarFile.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'Avatar size must be less than 5MB' },
          { status: 400 }
        );
      }

      try {
        const bytes = await avatarFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2);
        const extension = avatarFile.name.split('.').pop();
        const filename = `avatar-${randomId}-${timestamp}.${extension}`;
        
        // Save to public/uploads directory
        const uploadsDir = join(process.cwd(), 'public', 'uploads');
        const filepath = join(uploadsDir, filename);
        
        // Create uploads directory if it doesn't exist
        const fs = require('fs');
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }

        await writeFile(filepath, buffer);
        imageUrl = `/uploads/${filename}`;

        console.log('Avatar uploaded:', imageUrl);
      } catch (uploadError) {
        console.error('Avatar upload error:', uploadError);
        // Continue without avatar if upload fails
      }
    }

    console.log('Creating user with image:', imageUrl);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        image: imageUrl, // Will be null if no image uploaded
      }
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    console.log('User created:', userWithoutPassword);

    return NextResponse.json({
      message: 'User created successfully',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}