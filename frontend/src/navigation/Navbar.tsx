import StaggeredMenu from "../components/ui/staggerMenu";

export default function Navbar() {
  const menuItems = [
    { label: "Home", ariaLabel: "Go to home page", link: "/" },

    { label: "Notes", ariaLabel: "View our notes", link: "/notes" },
  ];

  const socialItems = [

    { label: "GitHub", link: "https://github.com/cb-here" },
    { label: "LinkedIn", link: "https://linkedin.com/in/chandrabhushan-vishwakarma-323347352" },
  ];
  return (
    <nav style={{ height: "100vh", position: "fixed", zIndex: 50, pointerEvents: "none" }}>
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#fff"
        openMenuButtonColor="#fff"
        changeMenuColorOnOpen={true}
        colors={["#B19EEF", "#5227FF"]}
        logoUrl="logo.png"
        accentColor="#c1a362"
        isFixed={true}
      />
    </nav>
  );
}
