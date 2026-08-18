import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#F0F0F0] pt-8 sm:pt-12 pb-4 sm:pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <h2 className="text-xl sm:text-2xl font-integral font-bold mb-3 sm:mb-4">SHOP.CO</h2>
            <p className="text-gray-600 text-xs sm:text-sm max-w-sm">
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>
            <div className="flex gap-3 mt-3 sm:mt-4">
              {/* Facebook */}
              <a 
                href="#" 
                className="bg-white p-1.5 sm:p-2 rounded-full hover:bg-gray-200 transition shadow-sm"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>

              {/* Twitter/X */}
              <a 
                href="#" 
                className="bg-white p-1.5 sm:p-2 rounded-full hover:bg-gray-200 transition shadow-sm"
                aria-label="Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16zM4 20l6.768 -6.768M19.5 4l-6.768 6.768"/>
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href="#" 
                className="bg-white p-1.5 sm:p-2 rounded-full hover:bg-gray-200 transition shadow-sm"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>

              {/* YouTube */}
              <a 
                href="#" 
                className="bg-white p-1.5 sm:p-2 rounded-full hover:bg-gray-200 transition shadow-sm"
                aria-label="YouTube"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </a>

              {/* GitHub */}
              <a 
                href="#" 
                className="bg-white p-1.5 sm:p-2 rounded-full hover:bg-gray-200 transition shadow-sm"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm sm:text-base mb-2 sm:mb-4">COMPANY</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
              <li><a href="#" className="hover:text-black transition">About</a></li>
              <li><a href="#" className="hover:text-black transition">Features</a></li>
              <li><a href="#" className="hover:text-black transition">Works</a></li>
              <li><a href="#" className="hover:text-black transition">Career</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold text-sm sm:text-base mb-2 sm:mb-4">HELP</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
              <li><a href="#" className="hover:text-black transition">Customer Support</a></li>
              <li><a href="#" className="hover:text-black transition">Delivery Details</a></li>
              <li><a href="#" className="hover:text-black transition">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-black transition">Privacy Policy</a></li>
            </ul>
          </div>

          {/* FAQ */}
          <div>
            <h4 className="font-semibold text-sm sm:text-base mb-2 sm:mb-4">FAQ</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
              <li><a href="#" className="hover:text-black transition">Account</a></li>
              <li><a href="#" className="hover:text-black transition">Manage Deliveries</a></li>
              <li><a href="#" className="hover:text-black transition">Orders</a></li>
              <li><a href="#" className="hover:text-black transition">Payments</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 mt-6 sm:mt-8 pt-4 sm:pt-6 flex flex-wrap items-center justify-between text-[10px] sm:text-sm text-gray-600">
          <p>Shop.co © 2000-2026, All Rights Reserved</p>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-5 sm:h-6" />
            <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="h-5 sm:h-6" />
            <img src="https://img.icons8.com/color/48/paypal.png" alt="PayPal" className="h-5 sm:h-6" />
            <img src="https://img.icons8.com/color/48/google-pay.png" alt="Google Pay" className="h-5 sm:h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;