import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, Divider, Grid, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import muiCustomStyles from "../../styles/muiCustomStyles";

const FAQ = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.faqReducer);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showDevelopmentalDiagnosis, setShowDevelopmentalDiagnosis] = useState(false);

  useEffect(() => {
    dispatch({ type: 'FETCH_FAQ' });
  }, [dispatch]);

  const handleCategoryExpand = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const toggleDevelopmentalDiagnosis = () => {
    setShowDevelopmentalDiagnosis(!showDevelopmentalDiagnosis);
  };

  const filteredQuestions = questions.filter(faq => 
    faq.has_developmental_diagnosis === showDevelopmentalDiagnosis
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
        <Typography variant="h4">Frequently Asked Questions</Typography>
        <Button 
           
          onClick={toggleDevelopmentalDiagnosis}
          sx={muiCustomStyles.backButton}
        >
          {showDevelopmentalDiagnosis ? "Show General Questions" : "Show Developmental Diagnosis Questions"}
        </Button>
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
                <Card sx={muiCustomStyles.faqcard} >
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