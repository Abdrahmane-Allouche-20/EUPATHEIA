
export default function Home() {
  return (
    <div className="min-h-screen  ">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your <span className="text-orange-600">Positive Quote</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Transform your mood with inspirational quotes tailored to your feelings. 
            Whether you're sad, happy, angry, or mad - we have the perfect words to lift your spirit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg">
              Get Your Quote
            </button>
            <button className="border-2 border-gray-300 hover:border-orange-600 hover:text-orange-600 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors">
              Browse Quotes
            </button>
          </div>
        </div>

        {/* Emotions Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How are you feeling today?
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">😢</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Feeling Sad</h3>
              <p className="text-gray-600 text-sm">Uplifting quotes to brighten your day</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">😊</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Feeling Happy</h3>
              <p className="text-gray-600 text-sm">Celebrate your joy with inspiring words</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">😠</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Feeling Angry</h3>
              <p className="text-gray-600 text-sm">Calming quotes to find your peace</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">😤</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Feeling Mad</h3>
              <p className="text-gray-600 text-sm">Soothing quotes to restore balance</p>
            </div>
          </div>
        </div>

        {/* Featured Quote Section */}
        <div className="mt-24 bg-white rounded-2xl p-8 shadow-sm border text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quote of the Day</h2>
          <blockquote className="text-2xl font-medium text-gray-700 italic mb-4">
            "The only way to do great work is to love what you do."
          </blockquote>
          <cite className="text-lg text-gray-500">— Steve Jobs</cite>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Mood-Based Quotes</h3>
            <p className="text-gray-600">Carefully curated quotes that match your current emotional state.</p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Daily Inspiration</h3>
            <p className="text-gray-600">Fresh positive quotes delivered daily to keep you motivated.</p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Share & Save</h3>
            <p className="text-gray-600">Save your favorite quotes and share them with friends and family.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
