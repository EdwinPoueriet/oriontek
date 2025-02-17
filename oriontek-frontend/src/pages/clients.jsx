import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box
} from '@mui/material';
import ClientList from '../components/clientList';
// import ClientForm from '../components/clientForm';
import api from '../services/api';
import ClientForm from '../components/ClientForm';

function Clients() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  
  const { data: clients, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: () => api.getClients().then(res => res.data)
  });

  const handleEdit = (client) => {
    setSelectedClient(client);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedClient(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Clientes
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => setIsFormOpen(true)}
        >
          Nuevo Cliente
        </Button>
      </Box>

      <Paper sx={{ p: 2 }}>
        {isLoading ? (
          <Typography>Cargando...</Typography>
        ) : (
          <ClientList 
            clients={clients || []} 
            onEdit={handleEdit}
          />
        )}
      </Paper>

      <ClientForm
        open={isFormOpen} 
        onClose={handleCloseForm}
        initialData={selectedClient}
      />
    </Container>
  );
}

export default Clients;