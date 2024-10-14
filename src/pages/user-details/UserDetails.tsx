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

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { showSnackbar } = useSnackbar();

  const handleSave = async (values: User) => {
    try {
      await userService.updateUser(Number(id), values);
      setIsEditing(false);
      showSnackbar(
        "User updated successfully. Please note that the user list will not update, as the API is not allowing it.",
        "success"
      );
    } catch (error) {
      showSnackbar("Error updating user. Please try again.", "error");
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
    fetchUserDetails();
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

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Paper className="user-details-container">
      <div className="user-details-header">
        <IconButton onClick={() => navigate("/users")}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4">User Details</Typography>
      </div>
      <form>
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
              disabled={!isEditing}
            />
          ))}
        </div>
        <div className="user-details-form-actions">
          {isEditing ? (
            <>
              <Button
                onClick={() => formik.handleSubmit()}
                variant="contained"
                color="primary"
              >
                Save
              </Button>
              <Button onClick={() => setIsEditing(false)}>Cancel</Button>
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
