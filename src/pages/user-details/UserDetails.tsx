import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import * as Yup from "yup";
import { useFormik } from "formik";
import userService, { User } from "../../services/api/user-service";
import { useSnackbar } from "../../services/snackbar-service";
import "./UserDetails.css";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
});

const fields = [
  {
    name: "firstName",
    label: "First Name",
  },
  {
    name: "lastName",
    label: "Last Name",
  },
  {
    name: "email",
    label: "Email",
  },
  {
    name: "phone",
    label: "Phone",
  },
];

/**
 * UserDetails component
 * This component is used to display and manage user details.
 * It serves three purposes:
 * 1. View user details
 * 2. Edit existing user information
 * 3. Add a new user
 * The component adapts its behavior based on the route parameters and user interactions.
 */
const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { showSnackbar } = useSnackbar();

  const handleSave = async (values: User) => {
    try {
      if (isAdding) {
        await userService.addUser(values);
        showSnackbar("User added successfully.", "success");
        navigate("/users");
      } else {
        await userService.updateUser(Number(id), values);
        setIsEditing(false);
        showSnackbar(
          "User updated successfully. Please note that the user list will not update, as the API is not allowing it.",
          "success"
        );
      }
    } catch (error) {
      showSnackbar(`Error ${isAdding ? "adding" : "updating"} user. Please try again.`, "error");
    }
  };

  const formik = useFormik({
    initialValues: {
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSave,
  });

  useEffect(() => {
    if (id === "new") {
      setIsAdding(true);
      setIsEditing(true);
    } else {
      fetchUserDetails();
    }
  }, [id]);

  const fetchUserDetails = async () => {
    try {
      const fetchedUser = await userService.getUser(Number(id));
      setUser(fetchedUser);
      formik.setValues(fetchedUser);
    } catch (error) {
      showSnackbar("Error fetching user details. Please try again.", "error");
    }
  };

  if (!user && !isAdding) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Paper className="user-details-container">
      <div className="user-details-header">
        <IconButton onClick={() => navigate("/users")}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4">
          {isAdding ? "Add New User" : "User Details"}
        </Typography>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="user-details-form-fields">
          {fields.map((field) => (
            <TextField
              key={field.name}
              fullWidth
              label={field.label}
              name={field.name}
              value={formik.values[field.name as keyof User]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched[field.name as keyof User] &&
                Boolean(formik.errors[field.name as keyof User])
              }
              helperText={
                formik.touched[field.name as keyof User] &&
                formik.errors[field.name as keyof User]
              }
              disabled={!isEditing && !isAdding}
            />
          ))}
        </div>
        <div className="user-details-form-actions">
          {isEditing || isAdding ? (
            <>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                {isAdding ? "Add User" : "Save"}
              </Button>
              <Button onClick={() => {
                setIsEditing(false);
                setIsAdding(false);
                if (isAdding) navigate("/users");
              }}>
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
        </div>
      </form>
    </Paper>
  );
};

export default UserDetails;
