import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-darkText text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
            </svg>
            <h3 className="text-xl font-bold text-white">WebInsight <span className="text-primary">Scanner</span></h3>
          </div>
          
          <p className="text-gray-400 text-center max-w-md mb-6">
            Advanced website analysis for SEO, security, performance, and accessibility. 
            Get actionable insights instantly with our comprehensive scanner.
          </p>
          
          <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm w-full">
            <p>&copy; {new Date().getFullYear()} WebInsight Scanner. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
