import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Card, Container, Menu, Segment } from "semantic-ui-react";

import moves from "./data/data";

const colorMap = {
  Normal: "white",
  Fire: "orangered",
  Fighting: "brown",
  Water: "dodgerblue",
  Flying: "purple",
  Grass: "green",
  Poison: "darkpurple",
  Electric: "yellow",
  Ground: "burlywood",
  Psychic: "pink",
  Rock: "saddlebrown",
  Ice: "powderblue",
  Bug: "olive",
  Dragon: "darkblue",
  Ghost: "darkslateblue",
  Dark: "darkgray",
  Steel: "lightgray",
  Fairy: "lightpink"
};

export default function App() {
  const [search, setSearch] = useState("");
  const [debouncedCallback] = useDebouncedCallback(
    value => setSearch(value),
    250,
    []
  );
  const listedMoves = Object.keys(moves)
    .filter(move => move.toLowerCase().includes(search.toLowerCase()))
    .reduce((prev, next) => {
      prev[next] = moves[next];
      return prev;
    }, {});

  return (
    <Container>
      <Menu attached="top">
        <div className="ui category search item" style={{ flex: 1 }}>
          <div className="ui transparent icon input">
            <input
              className="prompt"
              type="text"
              placeholder="Search moves..."
              onChange={e => debouncedCallback(e.target.value)}
            />
            <i className="search link icon" />
          </div>
          <div className="results" />
        </div>
      </Menu>
      <Segment attached="bottom">
        <Card.Group itemsPerRow={3} stackable>
          {Object.entries(listedMoves).map(([move, fields]) => (
            <Card
              key={move}
              style={{
                background: colorMap[fields.Type]
              }}
            >
              <Card.Content>
                <Card.Header
                  content={move}
                  style={{ textTransform: "uppercase" }}
                />
              </Card.Content>
              {Object.entries(fields).map(([field, value]) => (
                <Card.Content
                  key={field}
                  extra
                  header={field}
                  description={value}
                  style={{ fontSize: "0.8rem" }}
                />
              ))}
            </Card>
          ))}
        </Card.Group>
      </Segment>
    </Container>
  );
}
