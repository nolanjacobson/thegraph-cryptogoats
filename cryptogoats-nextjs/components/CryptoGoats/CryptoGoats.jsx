import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
  createStyles,
  withStyles,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Avatar,
  Divider,
} from "@material-ui/core";
import axios from "axios";
const cryptoGoatStyles = (theme) =>
  createStyles({
    actionArea: {
      maxWidth: 300,
    },
    image: {
      height: 150,
    },
    goatName: {
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
    id: {
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
    attributes: {
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
    owner: {
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
  });

const CryptoGoat = ({ classes, id, goatName, goatMetadata, owner }) => {
  const [metadata, setMetadata] = useState(null);
  const [toggleCard, setToggleCard] = useState(false);

  const fetchMetadata = async (goatMetadata) => {
    const metadata = await axios.get(goatMetadata);
    if (metadata) {
      setMetadata(metadata.data);
    }
  };

  useEffect(() => {
    fetchMetadata(goatMetadata);
  }, []);

  return (
    <Grid item>
      <Card>
        {toggleCard === false ? (
          <CardActionArea
            className={classes.actionArea}
            onClick={() => setToggleCard(true)}
          >
            {metadata !== null && (
              <CardMedia
                className={classes.image}
                image={metadata.image}
                title={goatName}
              />
            )}
            <CardContent>
              <Typography
                variant="h6"
                component="h3"
                className={classes.goatName}
              >
                {goatName || "—"}
              </Typography>
              <Typography color="textSecondary">ID</Typography>
              <Typography component="p" className={classes.id}>
                {id}
              </Typography>
              <Typography color="textSecondary">Owner</Typography>
              <Typography component="p" className={classes.owner}>
                {owner}
              </Typography>
            </CardContent>
          </CardActionArea>
        ) : (
          <CardActionArea
            className={classes.actionArea}
            onClick={() => setToggleCard(false)}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="h3"
                className={classes.goatName}
              >
                {goatName || "—"}
              </Typography>
              <Typography color="textSecondary">Stats</Typography>
              <List className={classes.root} subheader={<li />}>
                {metadata &&
                  metadata.attributes.map(({ trait_type, value }, index) => (
                    <li
                      key={`section-${index}`}
                      className={classes.listSection}
                    >
                      <ListItem key={`item-${index}`}>
                        <ListItemText primary={`${trait_type}: ${value}`} />
                      </ListItem>
                    </li>
                  ))}
              </List>
              <Typography color="textSecondary">Owner</Typography>
              <Typography component="p" className={classes.owner}>
                {owner}
              </Typography>
            </CardContent>
          </CardActionArea>
        )}
      </Card>
    </Grid>
  );
};

const StyledCryptoGoat = withStyles(cryptoGoatStyles)(CryptoGoat);

const cryptoGoatsStyles = (theme) =>
  createStyles({
    title: {
      marginTop: theme.spacing.unit * 2,
    },
  });

const CryptoGoats = ({ classes, cryptoGoats }) => (
  <Grid container direction="column" spacing={16}>
    <Grid item>
      <Typography variant="title" className={classes.title}>
        {cryptoGoats.length} CryptoGoat NFT's
      </Typography>
    </Grid>
    <Grid item>
      <Grid container direction="row" spacing={16}>
        {cryptoGoats.map((cryptoGoat) => (
          <StyledCryptoGoat key={cryptoGoat.id} {...cryptoGoat} />
        ))}
      </Grid>
    </Grid>
  </Grid>
);

export default withStyles(cryptoGoatsStyles)(CryptoGoats);
