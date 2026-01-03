import MapView from "./view/moles/MapView";
import styled from "styled-components";

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

function App() {
  return (
    <AppContainer>
      <MapView />
    </AppContainer>
  );
}

export default App;
