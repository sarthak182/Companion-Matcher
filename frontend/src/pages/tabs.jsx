import React, { useState, useRef, useEffect } from "react";
import Candidates from "./user";
import LikedCandidates from "./liked";
import DislikedCandidates from "./disliked";
import SignOutButton from "./sign-out";
import "../styles/tabswitcher.css";

const tabs = ["Matches", "Shortlisted", "Rejected"];

function TabView() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const [underlineStyle, setUnderlineStyle] = useState({});

  useEffect(() => {
    const container = containerRef.current;
    const tab = container.children[activeIndex];
    setUnderlineStyle({
      width: tab.offsetWidth,
      left: tab.offsetLeft
    });
  }, [activeIndex]);

  return (
    <div>
      {/* Tab bar */}
      <div className="tab-header">
  <div className="tab-buttons" ref={containerRef}>
    {tabs.map((tab, index) => (
      <button
        key={tab}
        className={`tab-btn ${index === activeIndex ? "active" : ""}`}
        onClick={() => setActiveIndex(index)}
      >
        {tab}
      </button>
    ))}
    <div className="underline" style={underlineStyle}></div>
  </div>
  
  <div className="signout-container">
    <SignOutButton />
  </div>
</div>
      <div style={{ marginTop: '30px' }}>
        {activeIndex === 0 && <Candidates />}
        {activeIndex === 1 && <LikedCandidates />}
        {activeIndex === 2 && <DislikedCandidates />}
      </div>
    </div>
  );
}

export default TabView;
