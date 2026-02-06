const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; 2025 SHOP Manager. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
            >
              Support
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
            >
              Documentation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
