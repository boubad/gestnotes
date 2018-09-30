import * as React from "react";
import * as ReactDOM from "react-dom";
import { ListItemsComponent } from './ListItemsComponent';
import { IListItem } from './../data/IListItem';
//
function onItemSelected(id: string) {
  console.log("Item selected: " + id);
}
//
const TEST_ITEMS:IListItem[] = [{
   displayText:'Text 1',
   docid: 'id1' ,
   url:'http://services.diarra.ovh:8888/img/E_MASSE_Tom.jpg'
}, {
    displayText:'Text 2',
    docid: 'id2' ,
    url:'http://services.diarra.ovh:8888/img/D_VILLARD_Paul.jpg'
}
];
//
it("renders ListItemComponent without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <ListItemsComponent
        items={TEST_ITEMS}
        forceRender={true}
        onItemSelected={onItemSelected}
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  