import { Link } from 'react-router-dom';
import "../../App.css";

function Footer() {
    return (
        <footer className="bg-[#9149ff] text-white py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center">
                    <div className="mb-4">
                        <p className="text-lg font-semibold">
                            &copy; 2024 YourCompany. All rights reserved.
                        </p>
                    </div>
                    <ul className="flex space-x-4 mb-4">
                        <li>
                            <Link to="/privacy" className="hover:text-gray-200">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link to="/terms" className="hover:text-gray-200">
                                Terms of Service
                            </Link>
                        </li>
                        <li>
                            <Link to="/support" className="hover:text-gray-200">
                                Support
                            </Link>
                        </li>
                    </ul>
                    <p className="text-sm">
                        Need help? <Link to="/contact" className="underline hover:text-gray-200">Contact us</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
