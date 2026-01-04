import { ThemeProvider } from "@mui/material/styles";
import MapView from "./view/moles/MapView";
import styled from "styled-components";
import theme from "./theme";

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <MapView />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
