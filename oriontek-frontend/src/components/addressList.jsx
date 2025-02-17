import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import api from '../services/api';

function AddressList({ clientId, onEdit }) {
  const queryClient = useQueryClient();
  
  const { data: addresses, isLoading } = useQuery({
    queryKey: ['addresses', clientId],
    queryFn: () => api.getAddresses(clientId).then(res => res.data),
    enabled: !!clientId
  });

  const deleteMutation = useMutation({
    mutationFn: (addressId) => api.deleteAddress(clientId, addressId),
    onSuccess: () => {
      queryClient.invalidateQueries(['addresses', clientId]);
    }
  });

  const handleDelete = (addressId) => {
    if (window.confirm('¿Estás seguro de eliminar esta dirección?')) {
      deleteMutation.mutate(addressId);
    }
  };

  if (isLoading) return <Typography>Cargando...</Typography>;

  if (!addresses?.length) {
    return <Typography>No hay direcciones registradas</Typography>;
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Dirección</TableCell>
            <TableCell>Ciudad</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Código Postal</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {addresses.map((address) => (
            <TableRow key={address.id}>
              <TableCell>{address.streetAddress}</TableCell>
              <TableCell>{address.city}</TableCell>
              <TableCell>{address.state}</TableCell>
              <TableCell>{address.postalCode}</TableCell>
              <TableCell align="right">
                <Tooltip title="Editar">
                  <IconButton onClick={() => onEdit(address)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar">
                  <IconButton onClick={() => handleDelete(address.id)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AddressList;