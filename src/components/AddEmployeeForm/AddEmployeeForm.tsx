import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Box
} from '@mui/material'
import {useForm, Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {motion} from 'framer-motion'
import {useCreateEmployee} from '../../hooks/useAirtable.ts'
import {CreateEmployeeData} from '../../types/employee.ts'
import styles from './AddEmployeeForm.module.scss'

const schema = yup.object({
  'Employee ID': yup.string().required('Employee ID is required'),
  'First Name': yup.string().required('First Name is required'),
  'Last Name': yup.string().required('Last Name is required'),
  'Job Title': yup.string().required('Job Title is required'),
  'Department': yup.string().required('Department is required'),
  'Email': yup.string().email('Invalid email').required('Email is required'),
  'Phone Number': yup.string().required('Phone Number is required')
})

interface AddEmployeeFormProps {
  open: boolean
  onClose: () => void
}

const AddEmployeeForm = ({open, onClose}: AddEmployeeFormProps) => {
  const createEmployee = useCreateEmployee()

  const {control, handleSubmit, reset, formState: {errors}} = useForm<CreateEmployeeData>({
    resolver: yupResolver(schema),
    defaultValues: {
      'Employee ID': '',
      'First Name': '',
      'Last Name': '',
      'Job Title': '',
      'Department': '',
      'Email': '',
      'Phone Number': ''
    }
  })

  const onSubmit = async (data: CreateEmployeeData) => {
    try {
      await createEmployee.mutateAsync(data)
      reset()
      onClose()
    } catch (error) {
      console.error('Failed to create employee:', error)
    }
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle className={styles.dialogTitle}>
        <Box className={styles.titleBox}>
          <Box className={styles.titleIcon}>
            👤
          </Box>
          Add New Employee
        </Box>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className={styles.dialogContent}>
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.1, duration: 0.4}}
          >
            {createEmployee.isError && (
              <Alert
                severity="error"
                className={styles.errorAlert}
              >
                Failed to create employee. Please check your API configuration.
              </Alert>
            )}

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="Employee ID"
                  control={control}
                  render={({field}) => (
                    <TextField
                      {...field}
                      label="Employee ID"
                      fullWidth
                      error={!!errors['Employee ID']}
                      helperText={errors['Employee ID']?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="First Name"
                  control={control}
                  render={({field}) => (
                    <TextField
                      {...field}
                      label="First Name"
                      fullWidth
                      error={!!errors['First Name']}
                      helperText={errors['First Name']?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="Last Name"
                  control={control}
                  render={({field}) => (
                    <TextField
                      {...field}
                      label="Last Name"
                      fullWidth
                      error={!!errors['Last Name']}
                      helperText={errors['Last Name']?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="Job Title"
                  control={control}
                  render={({field}) => (
                    <TextField
                      {...field}
                      label="Job Title"
                      fullWidth
                      error={!!errors['Job Title']}
                      helperText={errors['Job Title']?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="Department"
                  control={control}
                  render={({field}) => (
                    <TextField
                      {...field}
                      label="Department"
                      fullWidth
                      error={!!errors['Department']}
                      helperText={errors['Department']?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="Email"
                  control={control}
                  render={({field}) => (
                    <TextField
                      {...field}
                      label="Email"
                      type="email"
                      fullWidth
                      error={!!errors['Email']}
                      helperText={errors['Email']?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="Phone Number"
                  control={control}
                  render={({field}) => (
                    <TextField
                      {...field}
                      label="Phone Number"
                      fullWidth
                      error={!!errors['Phone Number']}
                      helperText={errors['Phone Number']?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </motion.div>
        </DialogContent>

        <DialogActions className={styles.dialogActions}>
          <Button
            onClick={handleClose}
            disabled={createEmployee.isPending}
            variant="outlined"
            size="large"
            className={styles.cancelButton}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={createEmployee.isPending}
            size="large"
            className={styles.submitButton}
          >
            {createEmployee.isPending ? (
              <Box className={styles.loadingContent}>
                <CircularProgress size={24} color="inherit"/>
                Creating...
              </Box>
            ) : (
              <Box className={styles.buttonContent}>
                ✨ Add Employee
              </Box>
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddEmployeeForm 