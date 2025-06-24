import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Rating,
  CircularProgress,
  Alert,
  Paper,
  IconButton,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Reviews = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [approvedReviews, setApprovedReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        // fallback only
        setApprovedReviews([
          {
            _id: 'david-sidilarsen',
            name: 'David',
            title: 'Sidilarsen',
            rating: 5,
            message:
              "Avant MDMC, notre chaîne YouTube stagnait. Depuis, on a franchi un vrai cap : millions de vues, abonnés x4, impact direct sur notre carrière. Collaboration ultra efficace.",
            createdAt: '2023-02-03T00:00:00.000Z',
            avatar: null
          },
          {
            _id: 'isabelle-fontan',
            name: 'Isabelle Fontan',
            title: 'MOX Musique',
            rating: 5,
            message:
              "Denis est un professionnel fiable, sérieux, réactif et surtout efficace. Nous avons travaillé ensemble sur de nombreuses campagnes, il a su me conseiller au mieux et je suis très satisfaite des résultats que nous avons obtenus. C'est l'expert Google Ads qui sera à l'écoute de votre problématique !",
            createdAt: '2023-02-03T00:00:00.000Z',
            avatar: null
          },
          {
            _id: 'fred-tavernier',
            name: 'Fred Tavernier',
            title: 'Try & Dye Records',
            rating: 5,
            message:
              "Cela fait maintenant quelques années que nous travaillons avec Denis pour la gestion de nos campagnes promotionnelles autour de la sortie des vidéoclips de nos artistes, notamment OUTED, et nous sommes très contents du résultat. La communication et les échanges sont efficaces et rapides et les résultats au rendez-vous. Denis est à l'écoute de nos besoins et sait réagir en conséquence en fonction des budgets.",
            createdAt: '2023-02-03T00:00:00.000Z',
            avatar: null
          },
          {
            _id: 'tania-barros',
            name: 'Tania Barros',
            title: 'Où sortir à Lisbonne',
            rating: 5,
            message:
              "Super travail de Denis. J'aime beaucoup travailler avec lui. Il est disponible et très pro. Je recommande les yeux fermés !",
            createdAt: '2023-02-03T00:00:00.000Z',
            avatar: null
          },
          {
            _id: 'manon-lhuillier',
            name: "Manon L’Huillier",
            title: 'MLH Promotion',
            rating: 5,
            message:
              "Un travail efficace sur chaque collaboration. Denis a su être à l'écoute de nos attentes et nous proposer des stratégies adaptées aux deadlines et aux budgets imposés.",
            createdAt: '2019-07-09T00:00:00.000Z',
            avatar: null
          }
        ]);
      } catch (err) {
        setError(t('reviews.error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [t]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % approvedReviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + approvedReviews.length) % approvedReviews.length);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: 'background.paper',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          align="center"
          gutterBottom
          sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 700, mb: 2 }}
        >
          {t('reviews.title')}
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: '800px', mx: 'auto' }}
        >
          {t('reviews.subtitle')}
        </Typography>

        <Box sx={{ position: 'relative', maxWidth: '1000px', mx: 'auto' }}>
          <Paper
            elevation={3}
            sx={{
              p: { xs: 3, md: 6 },
              borderRadius: 2,
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            {approvedReviews.length > 0 && (
              <Box sx={{ textAlign: 'center' }}>
                <Rating
                  value={approvedReviews[activeIndex].rating}
                  readOnly
                  size="large"
                  sx={{ mb: 2 }}
                />
                <Typography
                  variant="h6"
                  sx={{ mb: 2, fontSize: { xs: '1.1rem', md: '1.3rem' }, fontWeight: 500 }}
                >
                  "{approvedReviews[activeIndex].message}"
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, color: 'primary.main', mb: 0.5 }}
                >
                  {approvedReviews[activeIndex].name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {approvedReviews[activeIndex].title}
                </Typography>
              </Box>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
              <IconButton
                onClick={handlePrev}
                sx={{ backgroundColor: 'primary.main', color: 'white', '&:hover': { backgroundColor: 'primary.dark' } }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
              <IconButton
                onClick={handleNext}
                sx={{ backgroundColor: 'primary.main', color: 'white', '&:hover': { backgroundColor: 'primary.dark' } }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Reviews;
