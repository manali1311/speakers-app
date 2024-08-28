import React, { useEffect, useState } from "react";
import { GetSpeakers } from "../../services/speakers";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Drawer,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { AccountCircleRounded, Close, Edit, Search } from "@mui/icons-material";

const Sidebar = ({ open, onCloseDrawer }) => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpeakers, setSelectedSpeakers] = useState([]);

  //Gettig Speakers info
  const getSpeakers = async () => {
    try {
      const res = await GetSpeakers();
      setData(res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  // To handle checkbox selection
  const handleSelect = (speakerId) => {
    setSelectedSpeakers((prevSelected) =>
      prevSelected.includes(speakerId)
        ? prevSelected.filter((id) => id !== speakerId)
        : [...prevSelected, speakerId]
    );
  };

  // To check if a speaker is selected
  const isSelected = (speakerId) => selectedSpeakers.includes(speakerId);

  const filteredData = data.filter((el) => {
    //if no input the return the original
    if (searchQuery === "") {
      return el;
    }
    //return the item which contains the user input
    else {
      return (
        el.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  });

  useEffect(() => {
    getSpeakers();
  }, []);

  return (
    <div>
      <Card component={Paper}>
        <Drawer
          sx={{
            width: 400,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 400,
            },
          }}
          open={open}
          anchor="right"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              height: "50px",
              backgroundColor: "#F6F8F8",
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "18px",
                ml: 1,
              }}
            >
              Add Speaker
            </Typography>
            <IconButton onClick={onCloseDrawer}>
              <Close />
            </IconButton>
          </Box>

          <Box sx={{ p: 2 }}>
            <TextField
              type="search"
              placeholder="Search..."
              sx={{
                borderRadius: "12px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
              fullWidth
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "#E4875D" }} />
                    </InputAdornment>
                  ),
                },
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            />
          </Box>

          <Box sx={{ overflowY: "auto" }}>
            {filteredData?.length > 0 &&
              filteredData?.map((item, index) => {
                return (
                  <Card
                    sx={{
                      p: 1,
                      m: 1,

                      borderColor: selectedSpeakers.includes(item.id)
                        ? "#4CBB3E"
                        : "grey.300",
                    }}
                    key={index}
                  >
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe">
                          <AccountCircleRounded />
                        </Avatar>
                      }
                      action={
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={isSelected(item.id)}
                                onChange={() => handleSelect(item.id)}
                                name="check"
                                sx={{
                                  "&.Mui-checked": {
                                    color: "green",
                                  },
                                }}
                              />
                            }
                          />
                        </FormGroup>
                      }
                      title={item.name}
                      subheader={item.role}
                      children={item.organization}
                    />
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          ml: 6,
                          mt: -3,
                          color: "#E4875D",
                        }}
                      >
                        <Edit sx={{ ml: 1, height: 20, width: 20 }} />
                        <Typography sx={{ fontSize: "14px" }}>
                          Edit Speaker
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                );
              })}
          </Box>
          <Box
            sx={{
              m: 1,
              p: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Button
                sx={{
                  backgroundColor: "#F6F8F8",
                  color: "black",
                  textTransform: "capitalize",
                }}
                disabled={selectedSpeakers.length === 0}
              >
                Add
              </Button>
              <Button
                sx={{
                  color: "#E4875D",
                  backgroundColor: "#FCF3EF",
                  ml: 1,
                  textTransform: "capitalize",
                }}
              >
                Cancel
              </Button>
            </Box>

            <Button sx={{ color: "#E4875D", textTransform: "capitalize" }}>
              Create a Speaker
            </Button>
          </Box>
        </Drawer>
      </Card>
    </div>
  );
};

export default Sidebar;
