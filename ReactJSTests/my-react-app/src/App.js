function App(props) {
  console.log('App', props);
  return <h1>Hello, {props.name}! - {props.title}</h1>;
}

export default App;
