import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Accordion, AccordionDetails, AccordionSummary, Box, Card, 
  Divider, Grid, Typography, Tabs, Tab
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import muiCustomStyles from "../../styles/muiCustomStyles";

const FAQ = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.faqReducer);
  const user = useSelector(state => state.user);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    dispatch({ type: 'FETCH_FAQ' });
    if (user && user.has_diag_in_family !== undefined) {
      setTabValue(user.has_diag_in_family ? 1 : 0);
    }
  }, [dispatch, user]);

  const handleCategoryExpand = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredQuestions = questions.filter(faq => 
    faq.has_developmental_diagnosis === (tabValue === 1)
  );

  const groupedQuestions = filteredQuestions.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {});

  return (
    <Box sx={muiCustomStyles.box}>
      <Card sx={muiCustomStyles.card}>
        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
        <Typography variant="h4">Frequently Asked Questions</Typography>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Tabs 
  value={tabValue} 
  onChange={handleTabChange}
  sx={muiCustomStyles.tabs}
>
  <Tab label="General" sx={muiCustomStyles.tab} />
  <Tab label="Diagnosed" sx={muiCustomStyles.tab} />
</Tabs>
</Box>
        {Object.entries(groupedQuestions).map(([category, faqs]) => (
          <Accordion 
            sx={muiCustomStyles.accordion}
            key={category} 
            expanded={expandedCategory === category}
            onChange={() => handleCategoryExpand(category)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "white" }}/>}>
              <Typography variant="h6">{category}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container justifyContent="left" spacing={2}>
                {faqs.map((faq, index) => (
                  <Grid item {...muiCustomStyles.gridItem} key={index}>
                    <Box>
                      <Card sx={muiCustomStyles.faqcard}>
                        <Typography variant="subtitle1" className="font-bold">
                          Q: {faq.question}
                        </Typography>
                        <Divider sx={muiCustomStyles.divider} />
                        <Typography variant="body1">
                          A: {faq.answer}
                        </Typography>
                      </Card>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Card>
    </Box>
  );
};

export default FAQ;