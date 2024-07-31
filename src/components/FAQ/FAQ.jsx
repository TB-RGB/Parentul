import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Card, Typography, Accordion, AccordionSummary, AccordionDetails, Divider, Button } from "@mui/material";
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
        <Typography variant="h4" className="mb-4">Frequently Asked Questions</Typography>
        <Button 
           
          onClick={toggleDevelopmentalDiagnosis}
          sx={{mb: 1, ...muiCustomStyles.continueButton}}
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
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{category}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {faqs.map((faq, index) => (
                <Box key={index} className="mb-4">
                  <Typography variant="subtitle1" className="font-bold">
                    {faq.question}
                  </Typography>
                  <Divider />
                  <Typography variant="body1">
                    {faq.answer}
                  </Typography>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Card>
    </Box>
  );
};

export default FAQ;