
function Button({onclick, text}){
	var color;
	
	if(text === "Start") color = "green";
	else if(text === "Stop") color = "red";
	else color = "grey";

	return (
		<>
			<button onClick={onclick} style={{backgroundColor: `${color}`}}>{text}</button>
		</>
	);
}

export default Button;