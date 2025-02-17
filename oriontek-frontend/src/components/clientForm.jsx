import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack
  } from '@mui/material';
  import { useEffect, useState } from 'react';
  import { useMutation, useQueryClient } from '@tanstack/react-query';
  import api from '../services/api';
  
  function ClientForm({ open, onClose, initialData = null }) {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        if (initialData) {
          setFormData({
            id: initialData.id || null,
            firstName: initialData.firstName || '',
            lastName: initialData.lastName || '',
            email: initialData.email || '',
            phone: initialData.phone || ''
          });
        } else {
          setFormData({
            id: null,
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
          });
        }
      }, [initialData]);
      
  
    const mutation = useMutation({
      mutationFn: (data) => initialData 
        ? api.updateClient(initialData.id, data)
        : api.createClient(data),
      onSuccess: () => {
        queryClient.invalidateQueries(['clients']);
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
            {initialData ? 'Editar Cliente' : 'Nuevo Cliente'}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                name="firstName"
                label="Nombre"
                value={formData.firstName}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                name="lastName"
                label="Apellido"
                value={formData.lastName}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                name="phone"
                label="Teléfono"
                value={formData.phone}
                onChange={handleChange}
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
  
  export default ClientForm;