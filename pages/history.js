import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { useRouter } from "next/router";
import styles from "@/styles/history.module.css";

function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  const historyClicked = (e, historyItem) => {
    e.stopPropagation();
    const params = new URLSearchParams(historyItem);
    router.push(`/artwork?${params.toString()}`);
  };

  const removeHistoryClicked = (e, index) => {
    e.stopPropagation();
    setSearchHistory(current => current.filter((_, i) => i !== index));
  };

  return (
    <>
      {searchHistory.length === 0 ? (
        <Card>
          <Card.Body>
            <Card.Title>Nothing Here</Card.Title>
            <Card.Text>Try searching for some artwork</Card.Text>
          </Card.Body>
        </Card>
      ) : (

        <ListGroup>
          {searchHistory.map((historyItem, index) => {
            const params = new URLSearchParams(historyItem);
            const parsedHistoryItem = Object.fromEntries(params.entries());

            return (
              <ListGroup.Item
                onClick={e => historyClicked(e, historyItem)}
                className={styles.historyListItem}
                key={index}
              >
                {Object.keys(parsedHistoryItem).map(key => (
                  <React.Fragment key={key}>
                    {key}: <strong>{parsedHistoryItem[key]}</strong>&nbsp;
                  </React.Fragment>
                ))}
                
                <Button
                  className="float-end"
                  variant="danger"
                  size="sm"
                  onClick={e => removeHistoryClicked(e, index)}
                >
                  &times;
                </Button>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
    </>
  );
}

export default History;
