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
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import userService, { User } from "../../services/api/user-service";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../components/confirmation-dialog/ConfirmationDialog";
import { useSnackbar } from "../../services/snackbar-service";

/**
 * UserList Component
 * 
 * This component displays a paginated list of users with search and CRUD functionalities.
 * 
 * Key features:
 * 1. Pagination: Allows browsing through large sets of user data efficiently.
 * 2. Search: Enables filtering users based on a search query.
 * 3. Add User: Provides a button to navigate to the user creation page.
 * 4. View User Details: Allows viewing detailed information for each user.
 * 5. Delete User: Enables removal of users with a confirmation dialog.
 * 6. Snackbar Notifications: Uses the snackbar service for user feedback.
 */
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

  // Fetch users when page, rowsPerPage, or searchQuery changes
  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage, searchQuery]);

  /**
   * Fetches users based on current pagination and search parameters
   * Updates the users list and total user count
   */
  const fetchUsers = async () => {
    try {
      const response = searchQuery
        ? await userService.searchUsers(searchQuery, rowsPerPage, page * rowsPerPage)
        : await userService.getAllUsers(rowsPerPage, page * rowsPerPage);
      setUsers(response.users);
      setTotalUsers(response.total);
    } catch (error) {
      showSnackbar("Error fetching users", "error");
    }
  };

  /**
   * Pagination Handlers
   * These functions manage the current page and rows per page
   */
  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /**
   * Delete User Functionality
   * Handles the process of deleting a user, including confirmation
   */
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
        showSnackbar("Error deleting user", "error");
      }
    }
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  /**
   * Navigation Handlers
   * These functions handle navigation to user details and user creation pages
   */
  const handleShowDetails = (id: number) => {
    navigate(`/users/${id}`);
  };

  const handleAddUser = () => {
    navigate("/users/new");
  };

  /**
   * Search Functionality
   * Handles changes to the search query, resetting the page to 0
   */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  return (
    <Paper>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <TextField
          style={{ flexGrow: 1, marginRight: '1rem' }}
          variant="outlined"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearchChange}
          slotProps={{input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddUser}
        >
          Add User
        </Button>
      </div>
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
