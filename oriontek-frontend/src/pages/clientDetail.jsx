import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Breadcrumbs,
  Link
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// import AddressList from '../components/addressList';
// import AddressForm from '../components/addressForm';
import { useState } from 'react';
import api from '../services/api';
import AddressList from '../components/AddressList';
import AddressForm from '../components/AddressForm';

function ClientDetail() {
  const { id } = useParams();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const { data: client, isLoading } = useQuery({
    queryKey: ['client', id],
    queryFn: () => api.getClient(id).then(res => res.data),
    enabled: !!id
  });

  const handleEdit = (address) => {
    setSelectedAddress(address);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedAddress(null);
  };

  if (isLoading) return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography>Cargando...</Typography>
    </Container>
  );

  if (!client) return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography>Cliente no encontrado</Typography>
    </Container>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link component={RouterLink} to="/" underline="hover">
          Clientes
        </Link>
        <Typography color="text.primary">
          {client?.firstName} {client?.lastName}
        </Typography>
      </Breadcrumbs>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Direcciones del Cliente
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => setIsFormOpen(true)}
        >
          Agregar Dirección
        </Button>
      </Box>

      <Paper sx={{ p: 2 }}>
        <AddressList
          clientId={id} 
          onEdit={handleEdit}
        />
      </Paper>

      <AddressForm
        open={isFormOpen} 
        onClose={handleCloseForm}
        clientId={id}
        initialData={selectedAddress}
      />
    </Container>
  );
}

export default ClientDetail;