import * as React from "react";
import * as ReactDOM from "react-dom";
import { ListItemComponent } from "./ListItemComponent";
//
function onItemSelected(id: string) {
  console.log("Item selected: " + id);
}
//
it("renders ListItemComponent without crashing", () => {
  let docid = "testid";
  let displayText = "display text";
  let url = "http://services.diarra.ovh:8888/img/E_MASSE_Tom.jpg";
  const div = document.createElement("div");
  ReactDOM.render(
    <ListItemComponent
      docid={docid}
      displayText={displayText}
      url={url}
      forceRender={true}
      onItemSelected={onItemSelected}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
