import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  CheckCircle, 
  Users, 
  Search, 
  Menu, 
  X, 
  LogOut, 
  LayoutDashboard, 
  ShoppingBag, 
  Briefcase,
  Video,
  MessageCircle,
  CreditCard,
  Crown,
  Star,
  ArrowRight
} from 'lucide-react';

import { User, UserRole, ViewState } from './types';
import { MOCK_VENDORS, MOCK_PLANNERS, MOCK_BOOKINGS } from './services/mockData';
import { ServiceCard } from './components/ServiceCard';
import { AiAssistant } from './components/AiAssistant';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.LOGIN);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Login Handler with transition simulation
  const handleLogin = (role: UserRole) => {
    const mockUser: User = {
      id: 'u1',
      name: role === UserRole.CLIENT ? 'Alexander Sterling' : (role === UserRole.PLANNER ? 'Victoria Planner' : 'Royal Catering Co.'),
      role: role,
      email: 'user@eventide.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    };
    
    // Simulate loading for professional feel
    setTimeout(() => {
      setCurrentUser(mockUser);
      if (role === UserRole.CLIENT) setCurrentView(ViewState.DASHBOARD_CLIENT);
      else if (role === UserRole.PLANNER) setCurrentView(ViewState.DASHBOARD_PLANNER);
      else setCurrentView(ViewState.DASHBOARD_VENDOR);
    }, 600);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView(ViewState.LOGIN);
  };

  // --- COMPONENTS ---

  const Navbar = () => (
    <nav className="sticky top-0 z-50 bg-royal-900/90 backdrop-blur-xl border-b border-gold-500/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => currentUser ? setCurrentView(ViewState.DASHBOARD_CLIENT) : setCurrentView(ViewState.LANDING)}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gold-500 blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center text-royal-900 shadow-xl border border-white/20">
                <Crown size={24} strokeWidth={1.5} />
              </div>
            </div>
            <span className="font-display text-2xl font-bold text-white tracking-wider group-hover:text-gold-400 transition-colors">Eventide</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {!currentUser ? (
              <>
                <button onClick={() => setCurrentView(ViewState.LANDING)} className="text-gray-300 hover:text-gold-400 font-serif transition-colors tracking-wide">The Experience</button>
                <button onClick={() => setCurrentView(ViewState.LOGIN)} className="bg-gold-500 text-royal-900 px-6 py-2 rounded-full font-bold font-sans hover:bg-white hover:scale-105 transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                  Sign In
                </button>
              </>
            ) : (
              <>
                {currentUser.role === UserRole.CLIENT && (
                  <div className="flex gap-6">
                    {['Dashboard', 'Find Planner', 'Marketplace'].map((item, idx) => {
                      const viewMap = [ViewState.DASHBOARD_CLIENT, ViewState.PLANNER_DISCOVERY, ViewState.MARKETPLACE];
                      const isActive = currentView === viewMap[idx];
                      return (
                        <button 
                          key={item}
                          onClick={() => setCurrentView(viewMap[idx])} 
                          className={`text-sm font-medium font-serif tracking-wide transition-all ${isActive ? 'text-gold-400 border-b border-gold-400 pb-1' : 'text-gray-400 hover:text-white'}`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                )}
                <div className="flex items-center gap-4 pl-6 border-l border-white/10">
                  <div className="text-right hidden lg:block">
                    <p className="text-xs text-gold-400 uppercase tracking-widest">Welcome</p>
                    <span className="text-sm font-semibold text-white font-serif">{currentUser.name}</span>
                  </div>
                  <img src={currentUser.avatar} alt="Profile" className="w-10 h-10 rounded-full border-2 border-gold-500/50 object-cover" />
                  <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 transition-colors">
                    <LogOut size={20} />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gold-400">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-royal-900 border-b border-gold-500/30 p-6 flex flex-col gap-4 absolute w-full shadow-2xl animate-slide-up">
           {!currentUser ? (
              <button onClick={() => { setCurrentView(ViewState.LOGIN); setIsMobileMenuOpen(false); }} className="bg-gold-500 text-royal-900 w-full py-3 rounded-lg font-bold">
                Access Portal
              </button>
            ) : (
              <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 font-medium border border-red-900/50 p-3 rounded-lg justify-center">
                <LogOut size={18} /> Sign Out
              </button>
            )}
        </div>
      )}
    </nav>
  );

  // View: Landing Page (Royal Style)
  const LandingPage = () => (
    <div className="bg-royal-900 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
            alt="Royal Event" 
            className="w-full h-full object-cover opacity-40 scale-105 animate-float"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-royal-900 via-royal-900/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block border border-gold-500/30 rounded-full px-4 py-1 bg-royal-900/50 backdrop-blur-sm mb-6 animate-fade-in">
            <span className="text-gold-400 text-xs tracking-[0.2em] uppercase font-bold">The Ecosystem of Elegance</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-8 leading-tight drop-shadow-2xl animate-slide-up">
            Orchestrate Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-amber-600">Masterpiece</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-serif leading-relaxed animate-slide-up" style={{animationDelay: '0.2s'}}>
            Eventide offers an exclusive sanctuary for planning. Whether you seek the guidance of a maestro or wish to compose the event yourself.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 animate-slide-up" style={{animationDelay: '0.4s'}}>
            <button 
              onClick={() => setCurrentView(ViewState.LOGIN)}
              className="group relative px-8 py-4 bg-gold-500 text-royal-900 rounded-sm font-bold tracking-widest overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <span className="relative flex items-center gap-2">
                ENTER PORTAL <ArrowRight size={16} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3D Cards Section */}
      <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid md:grid-cols-2 gap-8 perspective-1000">
          {/* Card 1 */}
          <div className="group bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-2xl card-3d-hover cursor-default relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl group-hover:bg-gold-500/20 transition-all"></div>
            <div className="w-16 h-16 bg-gradient-to-br from-royal-800 to-black rounded-full flex items-center justify-center text-gold-400 mb-6 border border-gold-500/20 shadow-lg">
              <Crown size={32} />
            </div>
            <h3 className="text-2xl font-display text-white mb-4">Royal Guidance</h3>
            <p className="text-gray-400 leading-relaxed mb-6 font-serif">
              Entrust your vision to our elite tier of professional planners. A fully managed, stress-free journey to perfection.
            </p>
            <span className="text-gold-400 text-sm uppercase tracking-widest font-bold border-b border-gold-400/30 pb-1">Discover Planners</span>
          </div>

          {/* Card 2 */}
          <div className="group bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-2xl card-3d-hover cursor-default relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
            <div className="w-16 h-16 bg-gradient-to-br from-royal-800 to-black rounded-full flex items-center justify-center text-blue-300 mb-6 border border-blue-400/20 shadow-lg">
              <ShoppingBag size={32} />
            </div>
            <h3 className="text-2xl font-display text-white mb-4">Bespoke Creation</h3>
            <p className="text-gray-400 leading-relaxed mb-6 font-serif">
              Curate every detail personally. Access our exclusive marketplace of verified artisans, florists, and gourmet caterers.
            </p>
            <span className="text-blue-300 text-sm uppercase tracking-widest font-bold border-b border-blue-400/30 pb-1">Explore Marketplace</span>
          </div>
        </div>
      </div>
    </div>
  );

  // View: 3D Login Page
  const LoginView = () => (
    <div className="min-h-screen bg-royal-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold-500/10 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px] animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-5xl w-full relative z-10 flex flex-col items-center">
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.3)] rotate-3 hover:rotate-0 transition-transform duration-500">
            <Crown size={40} className="text-royal-900" />
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">Eventide</h2>
          <p className="text-gold-400 font-serif tracking-widest uppercase text-sm">Select Your Identity</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full perspective-1000">
          {/* Client Card */}
          <button 
            onClick={() => handleLogin(UserRole.CLIENT)}
            className="group relative h-96 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-all duration-500 card-3d-hover"
          >
            <div className="absolute inset-0 border border-gold-500/0 group-hover:border-gold-500/30 rounded-3xl transition-all duration-500"></div>
            <div className="w-20 h-20 bg-royal-800 rounded-full flex items-center justify-center text-gold-400 mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500">
              <Star size={32} className="fill-gold-400/20" />
            </div>
            <h3 className="text-2xl font-display text-white mb-2">Client</h3>
            <p className="text-gray-400 text-sm font-serif px-4">I wish to plan a magnificent event.</p>
            <div className="mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 text-gold-400 text-xs tracking-widest font-bold">ENTER DASHBOARD &rarr;</div>
          </button>

          {/* Planner Card */}
          <button 
            onClick={() => handleLogin(UserRole.PLANNER)}
            className="group relative h-96 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-all duration-500 card-3d-hover"
            style={{transitionDelay: '100ms'}}
          >
             <div className="absolute inset-0 border border-purple-500/0 group-hover:border-purple-500/30 rounded-3xl transition-all duration-500"></div>
            <div className="w-20 h-20 bg-royal-800 rounded-full flex items-center justify-center text-purple-400 mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500">
              <Briefcase size={32} />
            </div>
            <h3 className="text-2xl font-display text-white mb-2">Planner</h3>
            <p className="text-gray-400 text-sm font-serif px-4">I manage events and curate experiences.</p>
            <div className="mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 text-purple-400 text-xs tracking-widest font-bold">ACCESS SUITE &rarr;</div>
          </button>

          {/* Vendor Card */}
          <button 
            onClick={() => handleLogin(UserRole.VENDOR)}
            className="group relative h-96 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-all duration-500 card-3d-hover"
            style={{transitionDelay: '200ms'}}
          >
             <div className="absolute inset-0 border border-emerald-500/0 group-hover:border-emerald-500/30 rounded-3xl transition-all duration-500"></div>
            <div className="w-20 h-20 bg-royal-800 rounded-full flex items-center justify-center text-emerald-400 mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500">
              <ShoppingBag size={32} />
            </div>
            <h3 className="text-2xl font-display text-white mb-2">Vendor</h3>
            <p className="text-gray-400 text-sm font-serif px-4">I offer premium services and products.</p>
            <div className="mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 text-emerald-400 text-xs tracking-widest font-bold">MANAGE SERVICES &rarr;</div>
          </button>
        </div>
        
        <div className="mt-16 animate-fade-in opacity-70 hover:opacity-100 transition-opacity">
          <button onClick={() => setCurrentView(ViewState.LANDING)} className="text-white font-serif border-b border-white/30 pb-1 hover:border-gold-400 hover:text-gold-400 transition-all">
            Explore as Guest
          </button>
        </div>
      </div>
    </div>
  );

  // Sub-View: Client Marketplace
  const Marketplace = () => (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="relative bg-royal-800 rounded-3xl p-10 overflow-hidden border border-white/5 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <span className="text-gold-500 text-xs font-bold tracking-widest uppercase mb-2 block">The Collection</span>
            <h2 className="text-3xl md:text-4xl font-display text-white mb-4">Curated Vendors</h2>
            <p className="text-gray-300 max-w-lg font-serif">Hand-selected artisans and professionals to bring your vision to life.</p>
          </div>
          <div className="w-full md:w-96 bg-royal-900/50 backdrop-blur-md p-2 rounded-full flex items-center border border-white/10 focus-within:border-gold-500/50 transition-colors">
            <Search className="ml-4 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search exclusively..." 
              className="bg-transparent border-none focus:outline-none text-white placeholder-gray-500 px-4 py-2 w-full font-sans"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {MOCK_VENDORS.filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase()) || v.category.toLowerCase().includes(searchTerm.toLowerCase())).map((vendor, idx) => (
          <div key={vendor.id} className="animate-slide-up" style={{animationDelay: `${idx * 100}ms`}}>
            <ServiceCard
              image={vendor.imageUrl}
              title={vendor.name}
              subtitle={vendor.category}
              rating={vendor.rating}
              reviews={vendor.reviewCount}
              price={vendor.priceRange}
              location={vendor.location}
              tags={['Elite Choice', 'Verified']}
            />
          </div>
        ))}
      </div>
    </div>
  );

  // View: Client Dashboard (Royal)
  const ClientDashboard = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Royal Sidebar */}
        <div className="w-full lg:w-72 flex-shrink-0 space-y-6">
           <div className="bg-white rounded-2xl shadow-[0_5px_25px_-5px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
              <div className="h-20 bg-royal-900 relative">
                <div className="absolute -bottom-6 left-6">
                  <img src={currentUser?.avatar} alt="Profile" className="w-16 h-16 rounded-xl border-4 border-white object-cover shadow-md" />
                </div>
              </div>
              <div className="pt-8 pb-6 px-6">
                  <p className="font-display font-bold text-xl text-royal-900">{currentUser?.name}</p>
                  <p className="text-sm text-gold-600 font-medium font-serif mt-1">Wedding • Aug 24, 2024</p>
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-slate-500">Progress</span>
                      <span className="font-bold text-royal-900">65%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gold-500 w-[65%]"></div>
                    </div>
                  </div>
              </div>
           </div>

           <nav className="space-y-2">
              {[
                { icon: LayoutDashboard, label: 'Overview', view: ViewState.DASHBOARD_CLIENT },
                { icon: Crown, label: 'Royal Planners', view: ViewState.PLANNER_DISCOVERY },
                { icon: ShoppingBag, label: 'Marketplace', view: ViewState.MARKETPLACE },
                { icon: MessageCircle, label: 'Concierge', view: null }
              ].map((item) => (
                <button 
                  key={item.label}
                  onClick={() => item.view && setCurrentView(item.view)} 
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 border border-transparent ${currentView === item.view 
                    ? 'bg-royal-900 text-white shadow-xl border-gold-500/30 translate-x-2' 
                    : 'bg-white text-slate-500 hover:bg-slate-50 hover:text-royal-900 shadow-sm'}`}
                >
                   <item.icon size={18} className={currentView === item.view ? 'text-gold-400' : ''} /> 
                   {item.label}
                </button>
              ))}
           </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
           {currentView === ViewState.DASHBOARD_CLIENT && (
              <div className="space-y-8 animate-fade-in">
                 {/* Stats Row */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { label: 'Total Budget', value: '$85,000', sub: 'Spent: $32,450' },
                      { label: 'Days Remaining', value: '142', sub: 'On Schedule' },
                      { label: 'Confirmed Guests', value: '128', sub: 'Target: 150' }
                    ].map((stat, i) => (
                      <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-transform duration-300">
                         <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">{stat.label}</h3>
                         <p className="text-3xl font-display font-bold text-royal-900">{stat.value}</p>
                         <p className="text-sm text-gold-600 font-serif mt-2 italic">{stat.sub}</p>
                      </div>
                    ))}
                 </div>

                 {/* Recent Activity / Bookings */}
                 <div>
                   <h3 className="text-2xl font-display font-bold text-royal-900 mb-6 flex items-center gap-3">
                     <span className="w-8 h-0.5 bg-gold-500 block"></span> 
                     Recent Engagements
                   </h3>
                   <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                      {MOCK_BOOKINGS.map((booking) => (
                         <div key={booking.id} className="p-6 border-b border-slate-50 last:border-0 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                            <div className="flex items-center gap-5">
                               <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-inner ${booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                  {booking.status === 'confirmed' ? <CheckCircle size={20} /> : <Calendar size={20} />}
                               </div>
                               <div>
                                  <p className="font-display font-bold text-lg text-royal-900 group-hover:text-gold-600 transition-colors">{booking.serviceName}</p>
                                  <p className="text-sm text-slate-500 font-serif">Provided by {booking.providerName}</p>
                               </div>
                            </div>
                            <div className="text-right">
                               <p className="font-bold text-royal-900 font-display">${booking.amount.toLocaleString()}</p>
                               <span className={`inline-block mt-1 text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-bold ${booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                  {booking.status}
                               </span>
                            </div>
                         </div>
                      ))}
                   </div>
                 </div>
              </div>
           )}

           {currentView === ViewState.MARKETPLACE && <Marketplace />}
           
           {currentView === ViewState.PLANNER_DISCOVERY && (
              <div className="space-y-8 animate-fade-in">
                 <div className="text-center mb-12">
                    <h2 className="text-4xl font-display font-bold text-royal-900 mb-4">The Royal Planners</h2>
                    <p className="text-slate-600 font-serif italic">Distinguished professionals for your most memorable occasions.</p>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {MOCK_PLANNERS.map((planner, idx) => (
                       <div key={planner.id} className="animate-slide-up" style={{animationDelay: `${idx * 100}ms`}}>
                          <ServiceCard 
                              title={planner.name}
                              subtitle={`${planner.experienceYears} Years of Excellence`}
                              image={planner.imageUrl}
                              rating={planner.rating}
                              reviews={planner.projectsCompleted}
                              tags={['Master Planner', planner.specialty]}
                          />
                       </div>
                    ))}
                 </div>
              </div>
           )}
        </div>
      </div>
      <AiAssistant />
    </div>
  );

  // Simplified Professional Dashboard
  const ProfessionalDashboard = () => (
     <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-royal-900 text-white rounded-3xl p-10 mb-10 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
           <div className="relative z-10">
             <h2 className="text-4xl font-display font-bold mb-2">
                Welcome back, {currentUser?.name}
             </h2>
             <p className="text-gold-200 font-serif text-lg italic">
                Your schedule for today is looking splendid.
             </p>
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
           <div className="bg-white rounded-2xl shadow-[0_5px_30px_-10px_rgba(0,0,0,0.08)] border border-slate-100 p-8">
              <div className="flex justify-between items-center mb-8">
                 <h3 className="font-display font-bold text-xl text-royal-900">Inquiries</h3>
                 <span className="bg-royal-900 text-gold-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">2 Pending</span>
              </div>
              <div className="space-y-4">
                 {[1, 2].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-gold-400/30 hover:bg-white transition-all cursor-pointer shadow-sm">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                             <img src={`https://picsum.photos/100/100?random=${i+20}`} alt="User" className="w-full h-full object-cover" />
                          </div>
                          <div>
                             <p className="font-bold text-royal-900">Wedding Inquiry</p>
                             <p className="text-xs text-slate-500 font-serif">Requested just now</p>
                          </div>
                       </div>
                       <div className="flex gap-2">
                          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors"><CheckCircle size={16} /></button>
                          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"><X size={16} /></button>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="bg-white rounded-2xl shadow-[0_5px_30px_-10px_rgba(0,0,0,0.08)] border border-slate-100 p-8">
               <h3 className="font-display font-bold text-xl text-royal-900 mb-8">Command Center</h3>
              <div className="grid grid-cols-2 gap-5">
                 {[
                   { icon: Video, label: 'Studio Call' },
                   { icon: Calendar, label: 'Availability' },
                   { icon: CreditCard, label: 'Payments' },
                   { icon: MessageCircle, label: 'Messages' },
                 ].map((action) => (
                   <button key={action.label} className="p-6 border border-slate-100 rounded-2xl hover:bg-royal-900 hover:text-white group transition-all duration-300 flex flex-col items-center gap-3 shadow-sm hover:shadow-xl">
                      <action.icon className="text-royal-900 group-hover:text-gold-400 transition-colors" size={24} />
                      <span className="text-sm font-bold font-sans tracking-wide">{action.label}</span>
                   </button>
                 ))}
              </div>
           </div>
        </div>
     </div>
  );

  return (
    <div className="min-h-screen bg-cream font-sans text-royal-900 selection:bg-gold-200 selection:text-royal-900">
      {currentView !== ViewState.LOGIN && <Navbar />}
      
      <main>
        {currentView === ViewState.LANDING && <LandingPage />}
        {currentView === ViewState.LOGIN && <LoginView />}
        
        {(currentView === ViewState.DASHBOARD_CLIENT || 
          currentView === ViewState.MARKETPLACE || 
          currentView === ViewState.PLANNER_DISCOVERY) && currentUser?.role === UserRole.CLIENT && (
          <ClientDashboard />
        )}

        {(currentView === ViewState.DASHBOARD_PLANNER || currentView === ViewState.DASHBOARD_VENDOR) && (
           <ProfessionalDashboard />
        )}
      </main>
    </div>
  );
};

export default App;