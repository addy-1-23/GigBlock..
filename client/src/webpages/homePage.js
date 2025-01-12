import { useState, useEffect } from 'react';
import { Mail, MapPin, Phone, Star, MessageCircle, Settings, Activity, Info, Home, FileText, Link, FilePlus, Moon, Briefcase, Sun, Users } from 'lucide-react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom'; 

export default function Dashboard() {
  const [isDark, setIsDark] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  const [isMoon, setIsMoon] = useState(true); // State to toggle between Moon and Sun
  
  const handleProfileImageClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setProfileImage(e.target.result);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      backgroundColor: isDark ? '#0f172a' : '#ffffff',
      color: isDark ? '#ffffff' : '#000000',
      fontFamily: 'Inter, sans-serif',
    },
    sidebar: {
      width: '240px',
      backgroundColor: '#000000',
      color: '#ffffff',
      padding: '24px',
      height: '100vh',
      position: 'fixed',
      overflowY: 'auto',
      left: 0,
      top: 0,
    },
    sidebarLogo: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      marginBottom: '24px',
      fontSize: '30px',
      fontWeight: 600,
    },
    logoIcon: {
      width: '70px',
      height: '70px',
      backgroundColor: '#000000',
      color: '#ffffff',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '30px',
      fontWeight: 600,
      marginLeft: '20px',
    },
    addButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#343840',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      marginBottom: '24px',
      transition: 'background-color 0.2s',
    },
    navSection: {
      marginBottom: '24px',
    },
    navLabel: {
      fontSize: '12px',
      color: '#6b7280',
      marginBottom: '12px',
      fontWeight: 600,
      letterSpacing: '10px',
    },
    navButton: {
      width: '100%',
      padding: '10px 12px',
      backgroundColor: 'transparent',
      color: '#ffffff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '4px',
      transition: 'background-color 0.2s',
      height: '50px',
      fontSize: '16px',
    },
    main: {
      marginLeft: '260px',
      padding: '40px',
      width: 'calc(100% - 240px)',
    },
    profileSection: {
      marginBottom: '30px',
    },
    profileHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px', // Adjusted gap for better spacing
      marginBottom: '24px',
    },
    avatar: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      backgroundColor: isDark ? '#8804fc' : '#8804fc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '48px',
      fontWeight: 600,
      cursor: 'pointer',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      border: `2px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
      color: isDark ? '#ffffff' : '#ffffff',

    },
    profileInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      flex: 1, // Allow profileInfo to take available space
    },
    profileName: {
      fontSize: '24px',
      fontWeight: 600,
    },
    profileDetail: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '24px',
      marginBottom: '32px',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '24px',
    },
    statCard: {
      backgroundColor: isDark ? '#1e293b' : '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      
        border: `1px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
        transition: 'transform 0.2s, box-shadow 0.2s',
      
      
    },
    infoItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: isDark ? '#94a3b8' : '#64748b',
      marginBottom: '12px',
      padding: '16px',
      borderRadius: '8px',
      transition: 'all 0.2s',
      cursor: 'pointer',
      backgroundColor: isDark ? '#1e293b' : '#ffffff',
      border: `1px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
    },
    rating: {
      display: 'flex',
      gap: '4px',
      color: '#fbbf24',
    },
    graphsGrid: {
      display: 'grid',
      gap: '24px',
    },
    graphRow: {
      display: 'flex',
      gap: '24px',
      marginBottom: '24px',
    },
    graphCard: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: isDark ? '#1e293b' : '#ffffff',
      borderRadius: '12px',
      border: `1px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
      overflow: 'hidden',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    graphContent: {
      flex: 1,
      padding: '24px',
    },
    graphDetails: {
      flex: 1,
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    card: {
      backgroundColor: isDark ? '#1e293b' : '#ffffff',
      borderRadius: '12px',
      border: `1px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
      overflow: 'hidden',
      marginBottom: '24px',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    cardHeader: {
      padding: '24px 24px 0',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: 600,
      marginBottom: '8px',
    },
    cardContent: {
      padding: '24px',
      display: 'flex',
      justifyContent: 'space-between', // Aligns profile info and buttons
      alignItems: 'flex-start', // Aligns items to the top
    },
    tabs: {
      display: 'flex',
      flexDirection: 'column',
    },
    tabsList: {
      display: 'flex',
      borderBottom: `1px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
      marginBottom: '20px',
      marginLeft: '280px',
    },
    tabsTrigger: {
      padding: '12px 24px',
      cursor: 'pointer',
      borderBottom: '2px solid transparent',
      transition: 'all 0.2s',
      
    },
    activeTabsTrigger: {
      borderBottomColor: '#3b82f6',
    },
    tabsContent: {
      display: 'none',
    },
    activeTabsContent: {
      display: 'block',
      marginLeft: '17px',
      width: '1000px'
    },
    chartContainer: {
      width: '100%',
      height: '300px',
      
      

    },
    circularButtonContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '25px', // Space between buttons
      marginTop: '30px',
      marginRight: '100px',
      
    },
    circularButton: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#8804fc',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
  };

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    contact: "",
    place: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);  
      setUserData({
        fullName: decoded.name,
        email: decoded.email,
        contact: decoded.contact,
        place: decoded.place,
      });
    }
  }, []);

  const navigate = useNavigate(); 
  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarLogo}>
          <div style={styles.logoIcon}>V</div>
          <span>Vyuha</span>
        </div>

        <button 
          style={styles.addButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#2044b4'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#343840'
          }}
        >
          + Add New
        </button>

        <nav style={styles.navSection}>
          <div style={styles.navLabel}>PAGES</div>
          {[
            { icon: Home, label: 'Home' },
            { icon: FileText, label: 'Contract'},
            { icon: Link, label: 'Connect'},
            { icon: MessageCircle , label: 'Chat' },
            { icon: Settings , label: 'Settings' },
          ].map((item) => (
            <button
              key={item.label}
              style={{
                ...styles.navButton,
                backgroundColor: item.label === 'Home' ? '#8804fc' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (item.label !== 'Home') {
                  e.currentTarget.style.backgroundColor = '8804fc'
                }
              }}
              onMouseLeave={(e) => {
                if (item.label !== 'Home') {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
              onClick={() => {
                if (item.label === 'Contract') {
                  navigate('/contract'); // Navigate to /contract
                } else if (item.label === 'Profile') {
                  navigate('/profile'); // Navigate to /profile
                } else if (item.label === 'Connect') {
                  navigate('/connect'); // Navigate to /connect
                }else if (item.label === 'Settings') {
                  navigate('/settings'); 
                }else {
                  navigate(`/${item.label.toLowerCase()}`);

                }
              }}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main style={styles.main}>
        <div style={{
          ...styles.card,
          ':hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }
        }}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>Profile</h2>
          </div>
          <div style={styles.cardContent}>
            <div style={styles.profileHeader}>
              <div 
                style={{
                  ...styles.avatar,
                  ...profileImage ? { backgroundImage: `url(${profileImage})` } : {}

                }}
                onClick={handleProfileImageClick}
              >
                {!profileImage && `${userData.fullName[0]}`}
              </div>
              <div style={styles.profileInfo}>
                <h2 style={styles.profileName}>{userData.fullName}</h2>
                <div style={styles.rating}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="#fbbf24" />
                  ))}
                </div>
                <div style={{...styles.profileDetail, color: '#4ade80'}}>5 years of work experience</div>
                <div style={{...styles.profileDetail, color: '#60a5fa'}}>Professional Guitarist</div>
                <div style={{...styles.profileDetail, color: '#f472b6'}}>
                  <Info size={16} />
                  <span>Passionate musician and tech enthusiast</span>
        
                </div>
                <div style={{ ...styles.profileDetail, color: isDark ? '#ffffff' : '#000000' }}
                >
                  <Users size={16} />
                Connections : 299</div> 
              </div>
            </div>
            {/* Circular Buttons on the right side */}
            <div style={styles.circularButtonContainer}>
              <button 
                style={styles.circularButton} 
                onClick={() => {
                  setIsMoon(!isMoon);
                  setIsDark(!isDark); // Toggle dark mode
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)'; // Scale up on hover
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // Add shadow on hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'; // Reset scale
                  e.currentTarget.style.boxShadow = 'none'; // Remove shadow
                }}
              >
                {isMoon ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button 
                style={styles.circularButton} 
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)'; // Scale up on hover
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // Add shadow on hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'; // Reset scale
                  e.currentTarget.style.boxShadow = 'none'; // Remove shadow
                }}
              >
                <FileText size={20} />
              </button>
              <button 
                style={styles.circularButton} 
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)'; // Scale up on hover
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // Add shadow on hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'; // Reset scale
                  e.currentTarget.style.boxShadow = 'none'; // Remove shadow
                }}
              >
                <FilePlus size={20} />
              </button>
              <button 
                style={styles.circularButton} 
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)'; // Scale up on hover
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // Add shadow on hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'; // Reset scale
                  e.currentTarget.style.boxShadow = 'none'; // Remove shadow
                }}
              >
                <Briefcase size={20} />
              </button>
            </div>
          </div>
        </div>

        <div style={{
          ...styles.card,
          ':hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }
        }}>
          <div style={styles.cardContent}>
            <div style={styles.tabs}>
              <div style={styles.tabsList}>
                <div 
                  style={{
                    ...styles.tabsTrigger,
                    ...(activeTab === 'info' ? styles.activeTabsTrigger : {}),
                  }}
                  onClick={() => setActiveTab('info')}
                >
                  Contact Information
                </div>
                <div 
                  style={{
                    ...styles.tabsTrigger,
                    ...(activeTab === 'stats' ? styles.activeTabsTrigger : {}),
                  }}
                  onClick={() => setActiveTab('stats')}
                >
                  Statistics
                  
                </div>

                <div 
                  style={{
                    ...styles.tabsTrigger,
                    ...(activeTab === 'team' ? styles.activeTabsTrigger : {}),
                  }}
                  onClick={() => setActiveTab('team')}
                >
                  Team
                  
                </div>

                
              </div>
              <div style={{
                ...styles.tabsContent,
                ...(activeTab === 'info' ? styles.activeTabsContent : {}),
              }}>
                <div style={styles.infoGrid}>
                  <div style={styles.infoItem}>
                    <Mail size={20} />
                    <span>{userData.email}</span>
                  </div>
                  <div style={styles.infoItem}>
                    <Phone size={20} />
                    <span>{userData.contact}</span>
                  </div>
                  <div style={styles.infoItem}>
                    <MapPin size={20} />
                    <span>{userData.place}</span>
                  </div>
                  <div style={styles.infoItem}>
                    <Activity size={20} />
                    <span>Active since Jan 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> 
      </main>
    </div>
  );
}