import React, { useState, useEffect, useRef } from "react";
import Button from './Button';

function StopWatch(){
	const [isRunning, setIsRunning] = useState(false);
	const [elapsedTime, setElapsedTime] = useState(0);
	const intervalId = useRef(null); //  to store the timer ID so we can clear it
	const startTimeRef = useRef(0);

	useEffect(() => {
		if(isRunning){
			intervalId.current = setInterval(() => {
				setElapsedTime(Date.now() - startTimeRef.current);
			}, 0.1);
		}

		return () => clearInterval(intervalId.current);
	}, [isRunning]);  // Everytime isRunning changes

	function startTimer(){
		setIsRunning(true);
		startTimeRef.current = Date.now() - elapsedTime;
	}

	function endTimer(){
		setIsRunning(false);
	}

	function resetTimer(){
		setElapsedTime(0);
		setIsRunning(false);
	}

	function formatTimer(){
		let milli = `${elapsedTime%1000}`;
		let secs = `${Math.floor(elapsedTime/1000) % 60}`;
		let mins = `${Math.floor(elapsedTime/(1000*60)) % 60}`;
		let hrs = `${Math.floor(elapsedTime/(1000*60*60)) % 100}`;

		const z1 = 3 - milli.length;
		for(var i = 0; i<z1; i++) milli = "0" + milli;

		const z2 = 2 - secs.length;
		for(var i = 0; i<z2; i++) secs = "0" + secs;
		const z3 = 2 - mins.length;
		for(var i = 0; i<z3; i++) mins = "0" + mins;
		const z4 = 2 - hrs.length;
		for(var i = 0; i<z4; i++) hrs = "0" + hrs;

		
		return `${hrs} : ${mins} : ${secs} : ${milli}`
	}

	return (
		<>
			<div className="timer-container">
				<span>{formatTimer()}</span>
			</div>

			<div className="buttons-container">
				<Button onclick = {startTimer} text = "Start"/>
				<Button onclick = {endTimer} text = "Stop"/>
				<Button onclick = {resetTimer} text = "Reset"/>
			</div>
		</>
	);
}

export default StopWatch