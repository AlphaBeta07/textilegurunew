import { Link } from 'wouter';
import { GraduationCap } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="text-primary text-2xl" />
              <span className="font-sans font-bold text-xl text-primary">EduVision</span>
            </div>
            <p className="text-gray-600 text-sm">Visual learning platform with multilingual support for global learners.</p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary transition">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Programs</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/programs/1"><a className="hover:text-primary transition">Language Learning</a></Link></li>
              <li><Link href="/programs/2"><a className="hover:text-primary transition">Mathematics</a></Link></li>
              <li><Link href="/programs/3"><a className="hover:text-primary transition">Science</a></Link></li>
              <li><Link href="/programs/4"><a className="hover:text-primary transition">Programming</a></Link></li>
              <li><Link href="/programs/5"><a className="hover:text-primary transition">Business</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary transition">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition">Learning Guides</a></li>
              <li><a href="#" className="hover:text-primary transition">Community</a></li>
              <li><a href="#" className="hover:text-primary transition">Webinars</a></li>
              <li><a href="#" className="hover:text-primary transition">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary transition">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} EduVision. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <select className="px-3 py-1 bg-gray-100 rounded-md text-sm text-gray-700 focus:outline-none">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ja">日本語</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
}
