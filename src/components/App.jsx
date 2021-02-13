import React from "react";
// OG Code
// export default class App extends React.Component {
// 	render() {
// 		return (
// 			<div style={{ textAlign: "center" }}>
// 				<h1>Hello World</h1>
// 			</div>
// 		);
// 	}
// }

export default function App(props) {
	console.log(props.katamari)
	return (
		<div>{props.katamari}</div>
	)
}