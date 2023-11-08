import React, { useEffect, useState } from "react";
import style from "../styles/Autocomplete.module.css";

function Autocomplete(props) {
  const [isClick, setIsClick] = useState(true);

  const handleTrackClick = (trackName) => {
    if (isClick) {
      props.setTerm(trackName);
      props.search(trackName);
    }
  };

  useEffect(() => {
    // variables
    const autocomplete_container = document.getElementById(
      "autocomplete_container"
    );
    let isDown = false;
    let startX, scrollLeft;

    function handleWheel(e) {
      if (e.deltaY > 0) autocomplete_container.scrollLeft += 50;
      else autocomplete_container.scrollLeft -= 50;
      e.preventDefault();
    }

    function handleMousedown(e) {
      isDown = true;
      startX = e.pageX - autocomplete_container.offsetLeft;
      scrollLeft = autocomplete_container.scrollLeft;
    }

    function handleMouseleave() {
      isDown = false;
    }

    function handleMouseup() {
      isDown = false;
      setIsClick(true);
      console.log(isClick);
    }

    function handleMousemove(e) {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - autocomplete_container.offsetLeft;
      const walk = (x - startX) * 1.6;
      autocomplete_container.scrollLeft = scrollLeft - walk;
      console.log(walk);
      if (Math.abs(walk) > 50) {
        setIsClick(false);
      } else {
        setIsClick(true);
      }

      // setIsClick(Math.abs(walk) <= 50);
      console.log("state of click: " + isClick);
    }

    autocomplete_container.addEventListener("mousedown", handleMousedown);
    autocomplete_container.addEventListener("mouseleave", handleMouseleave);
    autocomplete_container.addEventListener("mouseup", handleMouseup);
    autocomplete_container.addEventListener("mousemove", handleMousemove);
    autocomplete_container.addEventListener("wheel", handleWheel);

    return () => {
      autocomplete_container.removeEventListener("wheel", handleWheel);
      autocomplete_container.removeEventListener("mousedown", handleMousedown);
      autocomplete_container.removeEventListener(
        "mouseleave",
        handleMouseleave
      );
      autocomplete_container.removeEventListener("mouseup", handleMouseup);
      autocomplete_container.removeEventListener("mousemove", handleMousemove);
    };
  }, []); // Empty dependency array to ensure it's only set up once

  return (
    <div className={style.autocomplete_container} id="autocomplete_container">
      {props.autocompleteData.map((track) => (
        <button
          key={track.id}
          className={style.track}
          onClick={() => handleTrackClick(track.name)}
        >
          <p>{track.name}</p>
        </button>
      ))}
    </div>
  );
}

export default Autocomplete;
