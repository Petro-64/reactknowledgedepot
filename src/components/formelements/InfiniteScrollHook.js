import React from 'react';


function  InfiniteScrollHook(props) {
    const [scrollTop, setScrollTop] = React.useState(0);
  
    const handleScroll = event => {
      setScrollTop(event.currentTarget.scrollTop);
      console.log("scroll");
    };
    
    return (
      <>
        <h2>Scroll Top: {scrollTop}</h2>
        <div 
        onScroll={handleScroll}
        style={{
          border: '3px solid black',
          height: 'calc(100vh - 400px)',
          overflow: 'scroll',
        }}
        >
          {props.children}
        </div>
      </>
    );

}

export default InfiniteScrollHook;