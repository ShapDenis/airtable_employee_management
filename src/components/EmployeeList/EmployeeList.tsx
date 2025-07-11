import {useState} from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Chip,
  TextField,
  IconButton,
  Badge,
  Tooltip
} from '@mui/material'
import {
  Add as AddIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material'
import {useEmployees} from '../../hooks/useAirtable.ts'
import AddEmployeeForm from '../AddEmployeeForm/AddEmployeeForm.tsx'
import EmployeeFilters from '../EmployeeFilters/EmployeeFilters.tsx'
import {Employee} from '../../types/employee.ts'
import styles from './EmployeeList.module.scss'

const EmployeeList = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([])
  const [searchValue, setSearchValue] = useState('')
  const {data: employees, isLoading, error} = useEmployees()

  if (isLoading) {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress/>
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error" className={styles.errorAlert}>
        Failed to load employees. Please check your Airtable API configuration.
      </Alert>
    )
  }

  const displayEmployees = filteredEmployees.length > 0 || employees?.length === 0
    ? filteredEmployees
    : employees || []

  return (
    <Box className={styles.container}>
      <Box className={styles.header}>
        <Box className={styles.headerContent}>
          <Box className={styles.logoSection}>
            <Typography className={styles.logo}>
              PLATA
            </Typography>
          </Box>
          <Box className={styles.headerActions}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search employees..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={styles.searchField}
              InputProps={{
                startAdornment: <SearchIcon className={styles.searchIcon}/>
              }}
            />
            <Tooltip title="Notifications">
              <IconButton className={styles.notificationButton}>
                <Badge badgeContent={3} color="error" className={styles.notificationBadge}>
                  <NotificationsIcon/>
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      <Box className={styles.mainHeader}>
        <Typography variant="h4" component="h1" className={styles.title}>
          Employee Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon/>}
          onClick={() => setIsFormOpen(true)}
          size="large"
          className={styles.addButton}
        >
          ✨ Add record
        </Button>
      </Box>

      {employees && employees.length > 0 && (
        <EmployeeFilters
          employees={employees}
          onFilteredEmployees={setFilteredEmployees}
        />
      )}

      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table>
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell className={styles.tableHeaderCell}>Employee ID</TableCell>
              <TableCell className={styles.tableHeaderCell}>First Name</TableCell>
              <TableCell className={styles.tableHeaderCell}>Last Name</TableCell>
              <TableCell className={styles.tableHeaderCell}>Job Title</TableCell>
              <TableCell className={styles.tableHeaderCell}>Department</TableCell>
              <TableCell className={styles.tableHeaderCell}>Email</TableCell>
              <TableCell className={styles.tableHeaderCell}>Phone Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayEmployees.map((employee) => (
              <TableRow
                key={employee.id}
                hover
                className={styles.tableRow}
              >
                <TableCell className={styles.employeeIdCell}>
                  {employee.fields['Employee ID']}
                </TableCell>
                <TableCell>{employee.fields['First Name']}</TableCell>
                <TableCell>{employee.fields['Last Name']}</TableCell>
                <TableCell>{employee.fields['Job Title']}</TableCell>
                <TableCell>
                  <Chip
                    label={employee.fields['Department']}
                    size="small"
                    variant="outlined"
                    className={styles.departmentChip}
                  />
                </TableCell>
                <TableCell>{employee.fields['Email']}</TableCell>
                <TableCell>{employee.fields['Phone Number']}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {displayEmployees.length === 0 && employees && employees.length > 0 && (
        <Box className={styles.noResultsContainer}>
          <Typography variant="h6" className={styles.noResultsTitle}>
            🔍 No employees match your filters
          </Typography>
          <Typography variant="body2" className={styles.noResultsSubtitle}>
            Try adjusting your search or filter criteria
          </Typography>
        </Box>
      )}

      {(!employees || employees.length === 0) && (
        <Box className={styles.emptyStateContainer}>
          <Typography variant="h6" className={styles.emptyStateTitle}>
            👥 No employees found
          </Typography>
          <Typography variant="body2" className={styles.emptyStateSubtitle}>
            Click "Add record" to create your first employee
          </Typography>
        </Box>
      )}

      <AddEmployeeForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </Box>
  )
}

export default EmployeeList 