import React from 'react';

export default function Review() {
    return (
        <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white shadow-xl rounded-lg p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Customer Reviews</h1>
                <p className="text-gray-600 mb-8">
                    Read what real verification customers have to say about their experience.
                </p>

                {/* Placeholder review content */}
                <div className="space-y-6">
                    <div className="border-b pb-6">
                        <div className="flex items-center mb-2">
                            <div className="text-yellow-400 flex">★★★★★</div>
                            <span className="ml-2 font-semibold">Verified Purchase</span>
                        </div>
                        <p className="text-gray-700">"Excellent service. The verification process was quick and easy."</p>
                        <p className="text-sm text-gray-500 mt-2">- Maria S.</p>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                        &larr; Back to Home
                    </a>
                </div>
            </div>
        </main>
    );
}
