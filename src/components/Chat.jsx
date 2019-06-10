import React from "react";
import { connect } from "react-redux";
import { Box, Heading, Button, Grid, InfiniteScroll, Text } from "grommet";
import { Notification } from "grommet-icons";
import { updateChattingStatus } from "../redux/actions/chat";
import BubbleLoading from "./utils/Loading.js";

const mapStatusToProps = (status, ownProps) => {
  return {
    status: status.chat.status
  };
};

const data = [
  { index: 0, from: 0, content: "hi there ," },
  { index: 1, from: 1, content: "hi," },
  { index: 2, from: 1, content: "what is your name," },
  {
    index: 3,
    from: 0,
    references: {
      work: "/"
    },
    content:
      "I am a bot built by Tim, for introducing him,I am a bot built by Tim, for introducing him,I am a bot built by Tim, for introducing him, <a href=/> a</a>"
  },
  {
    index: 4,
    from: 0,
    references: {
      work: "/"
    },
    content: "..."
  }
];

const ConversationBox = props => {
  const fromBot = props.item.from === 0;

  const getWidth = content => {
    if (content.length >= 128) {
      return "medium";
    } else if (content.length < 16) {
      return "xsmall";
    } else {
      return "small";
    }
  };

  return (
    <Box
      align={fromBot ? "start" : "end"}
      alignContent={fromBot ? "start" : "end"}
      alignSelf={fromBot ? "start" : "end"}
      animation={fromBot ? "fadeIn" : "slideLeft"}
      background={`dark-${props.item.from + 1}`}
      flex={false}
      justify={fromBot ? "start" : "end"}
      key={props.item.index + props.item.content}
      margin={{
        top: "xsmall",
        left: "xsmall",
        right: "xsmall"
      }}
      pad="small"
      round={fromBot ? { corner: "right" } : { corner: "left" }}
      width={getWidth(props.item.content)}
    >
      <Text size="small">{props.item.content}</Text>
    </Box>
  );
};

const Chat = props => (
  <Box
    background="accent-3"
    justify="start"
    margin={{ top: "medium", bottom: "medium", left: "large", right: "large" }}
    align="start"
    alignContent="start"
    alignSelf="center"
    fill="horizontal"
    height="700px"
    gap="small"
    round
    elevation="medium"
  >
    <Box
      direction="row"
      align="center"
      alignContent="center"
      justify="center"
      background="light-2"
      pad={{ left: "medium", right: "left", vertical: "small" }}
      elevation="medium"
      round={{ corner: "top" }}
      fill="horizontal"
    >
      <Text size="xsmall">{props.status}</Text>
    </Box>

    <Box fill overflow="auto">
      <BubbleLoading type="bubbles" />
      <InfiniteScroll items={data}>
        {item => <ConversationBox item={item} />}
      </InfiniteScroll>
    </Box>

    <Box
      direction="row"
      align="end"
      alignContent="end"
      background="light-4"
      pad={{ left: "medium", right: "left", vertical: "small" }}
      elevation="medium"
      round={{ corner: "bottom" }}
      fill="horizontal"
    >
      <Text size="large">Talking</Text>
    </Box>

    {/* <Box>

    </Box> */}
  </Box>
);

export default connect(
  mapStatusToProps,
  undefined
)(Chat);
