import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  TextField,
  InputAdornment,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import userService, { User } from "../../services/api/user-service";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../components/confirmation-dialog/ConfirmationDialog";
import { useSnackbar } from "../../services/snackbar-service";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage, searchQuery]);

  const fetchUsers = async () => {
    try {
      const response = searchQuery
        ? await userService.searchUsers(
            searchQuery,
            rowsPerPage,
            page * rowsPerPage
          )
        : await userService.getAllUsers(rowsPerPage, page * rowsPerPage);
      setUsers(response.users);
      setTotalUsers(response.total);
    } catch (error) {
      showSnackbar("Error fetching users:", "error");
    }
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteClick = (id: number) => {
    setUserToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (userToDelete) {
      try {
        await userService.deleteUser(userToDelete);
        fetchUsers();
        showSnackbar(
          "User deleted successfully. Please note that the user list will not update, as the API is not allowing it.",
          "success"
        );
      } catch (error) {
        showSnackbar("Error deleting user:", "error");
      }
    }
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleShowDetails = (id: number) => {
    navigate(`/users/${id}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  return (
    <Paper>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search users..."
        value={searchQuery}
        onChange={handleSearchChange}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 2 }}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleShowDetails(user.id)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalUsers}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => handleChangePage(newPage)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ConfirmationDialog
        open={deleteDialogOpen}
        title="Confirm Delete"
        content="Are you sure you want to delete this user?"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </Paper>
  );
};

export default UserList;
