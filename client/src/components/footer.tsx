import { Link } from 'wouter';
import { Scissors, Shirt, Info, Book, PhoneCall } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <Scissors className="text-primary text-2xl transform rotate-45" />
                <Shirt className="text-primary text-2xl absolute top-0.5 left-0.5 opacity-70" />
              </div>
              <div className="font-sans font-bold text-xl">
                <span className="text-primary">Textile</span>
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Guru</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Dr. Sachin M. Landage. 
              Dept. of Textiles, D.K.T.E. Society's, Textile & Engineering Institute, Ichalkaranji, Maharashtra, India.
               
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="smlandage@dkte.ac.in" className="text-gray-500 hover:text-primary transition">
                Email - smlandage@dkte.ac.in 
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Programs</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/programs/1"><div className="hover:text-primary transition">Textile Chemistry</div></Link></li>
              <li><Link href="/programs/2"><div className="hover:text-primary transition">Textile Technology</div></Link></li>
              <li><Link href="/programs/3"><div className="hover:text-primary transition">Man Made Textile Technology</div></Link></li>
              <li><Link href="/programs/4"><div className="hover:text-primary transition">Technical Textiles</div></Link></li>
              <li><Link href="/programs/5"><div className="hover:text-primary transition">Fashion Technology</div></Link></li> 
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-4"></h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {/* <li>
                <a href="#" className="flex items-center hover:text-primary transition">
                  <Book className="h-3.5 w-3.5 mr-2" />
                  <span>Textile Dictionary</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center hover:text-primary transition">
                  <Info className="h-3.5 w-3.5 mr-2" />
                  <span>Industry Guides</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center hover:text-primary transition">
                  <Shirt className="h-3.5 w-3.5 mr-2" />
                  <span>Fiber Database</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center hover:text-primary transition">
                  <Scissors className="h-3.5 w-3.5 mr-2" />
                  <span>Technical Articles</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center hover:text-primary transition">
                  <PhoneCall className="h-3.5 w-3.5 mr-2" />
                  <span>Expert Consultation</span>
                </a>
              </li> */}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-4"></h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {/* <li><a href="#" className="hover:text-primary transition">About TextileGuru</a></li>
              <li><a href="#" className="hover:text-primary transition">Our Experts</a></li>
              <li><a href="#" className="hover:text-primary transition">Industry Partners</a></li>
              <li><a href="#" className="hover:text-primary transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition">Terms of Service</a></li> */}
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© 2025 TextileGuru. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
