import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack
  } from '@mui/material';
  import { useState } from 'react';
  import { useMutation, useQueryClient } from '@tanstack/react-query';
  import api from '../services/api';
  
  function AddressForm({ open, onClose, clientId, initialData = null }) {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState(initialData || {
      streetAddress: '',
      city: '',
      state: '',
      postalCode: ''
    });
  
    const mutation = useMutation({
        mutationFn: (data) => api.createAddress(clientId, data),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['addresses', clientId] });
          onClose();
        }
      });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      mutation.mutate(formData);
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {initialData ? 'Editar Dirección' : 'Nueva Dirección'}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                name="streetAddress"
                label="Dirección"
                value={formData.streetAddress}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                name="city"
                label="Ciudad"
                value={formData.city}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                name="state"
                label="Estado/Provincia"
                value={formData.state}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                name="postalCode"
                label="Código Postal"
                value={formData.postalCode}
                onChange={handleChange}
                required
                fullWidth
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancelar</Button>
            <Button type="submit" variant="contained">
              {mutation.isLoading ? 'Guardando...' : 'Guardar'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
  
  export default AddressForm;