import {useState, useEffect} from 'react'
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Grid,
  Paper,
  Typography,
  InputAdornment,
  IconButton
} from '@mui/material'
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon
} from '@mui/icons-material'
import {motion} from 'framer-motion'
import {Employee} from '../../types/employee.ts'
import styles from './EmployeeFilters.module.scss'

interface EmployeeFiltersProps {
  employees: Employee[]
  onFilteredEmployees: (filtered: Employee[]) => void
}

const EmployeeFilters = ({employees, onFilteredEmployees}: EmployeeFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('')
  const [jobTitleFilter, setJobTitleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const departments = [...new Set(employees.map(emp => emp.fields.Department).filter(Boolean))]
  const jobTitles = [...new Set(employees.map(emp => emp.fields['Job Title']).filter(Boolean))]

  const applyFilters = () => {
    let filtered = employees

    if (searchQuery) {
      filtered = filtered.filter(emp => {
        const fullName = `${emp.fields['First Name']} ${emp.fields['Last Name']}`.toLowerCase()
        const email = emp.fields.Email?.toLowerCase() || ''
        const employeeId = emp.fields['Employee ID']?.toLowerCase() || ''
        const query = searchQuery.toLowerCase()

        return fullName.includes(query) ||
          email.includes(query) ||
          employeeId.includes(query)
      })
    }

    if (departmentFilter) {
      filtered = filtered.filter(emp => emp.fields.Department === departmentFilter)
    }

    if (jobTitleFilter) {
      filtered = filtered.filter(emp => emp.fields['Job Title'] === jobTitleFilter)
    }

    if (statusFilter) {
      if (statusFilter === 'active') {
        filtered = filtered.filter(emp => emp.fields.Email)
      } else if (statusFilter === 'inactive') {
        filtered = filtered.filter(emp => !emp.fields.Email)
      }
    }

    onFilteredEmployees(filtered)
  }

  useEffect(() => {
    applyFilters()
  }, [searchQuery, departmentFilter, jobTitleFilter, statusFilter, employees])

  const clearAllFilters = () => {
    setSearchQuery('')
    setDepartmentFilter('')
    setJobTitleFilter('')
    setStatusFilter('')
    onFilteredEmployees(employees)
  }

  const activeFiltersCount = [searchQuery, departmentFilter, jobTitleFilter, statusFilter]
    .filter(Boolean).length

  return (
    <motion.div
      initial={{opacity: 0, y: -20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.4}}
    >
      <Paper
        elevation={0}
        className={styles.filterContainer}
      >
        <Box className={styles.header}>
          <Box className={styles.headerLeft}>
            <FilterIcon className={styles.filterIcon}/>
            <Typography variant="h6" className={styles.title}>
              Filters & Search
            </Typography>
            {activeFiltersCount > 0 && (
              <Chip
                label={`${activeFiltersCount} active`}
                size="small"
                className={styles.activeChip}
              />
            )}
          </Box>

          {activeFiltersCount > 0 && (
            <IconButton
              onClick={clearAllFilters}
              size="small"
              className={styles.clearButton}
            >
              <ClearIcon/>
            </IconButton>
          )}
        </Box>

        <Grid container spacing={3}>
          {/* Search Field */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search by name, email, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className={styles.searchIcon}/>
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <FormControl fullWidth>
              <InputLabel className={styles.selectLabel}>Department</InputLabel>
              <Select
                value={departmentFilter}
                label="Department"
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className={styles.selectField}
              >
                <MenuItem value="">All Departments</MenuItem>
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Job Title Filter */}
          <Grid item xs={12} sm={4} md={2}>
            <FormControl fullWidth>
              <InputLabel className={styles.selectLabel}>Job Title</InputLabel>
              <Select
                value={jobTitleFilter}
                label="Job Title"
                onChange={(e) => setJobTitleFilter(e.target.value)}
                className={styles.selectField}
              >
                <MenuItem value="">All Positions</MenuItem>
                {jobTitles.map((title) => (
                  <MenuItem key={title} value={title}>
                    {title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Status Filter */}
          <Grid item xs={12} sm={4} md={2}>
            <FormControl fullWidth>
              <InputLabel className={styles.selectLabel}>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
                className={styles.selectField}
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="active">
                  <Box className={styles.statusIndicator}>
                    <Box className={`${styles.statusDot} active`}/>
                    Active
                  </Box>
                </MenuItem>
                <MenuItem value="inactive">
                  <Box className={styles.statusIndicator}>
                    <Box className={`${styles.statusDot} inactive`}/>
                    Inactive
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Results Summary */}
        <Box className={styles.summary}>
          <Typography variant="body2" color="text.secondary">
            Showing {employees.length} employees
          </Typography>

          {/* Active Filters */}
          <Box className={styles.filterChips}>
            {searchQuery && (
              <Chip
                label={`Search: "${searchQuery}"`}
                onDelete={() => setSearchQuery('')}
                size="small"
                className={styles.searchChip}
              />
            )}
            {departmentFilter && (
              <Chip
                label={`Dept: ${departmentFilter}`}
                onDelete={() => setDepartmentFilter('')}
                size="small"
                className={styles.departmentChip}
              />
            )}
            {jobTitleFilter && (
              <Chip
                label={`Role: ${jobTitleFilter}`}
                onDelete={() => setJobTitleFilter('')}
                size="small"
                className={styles.roleChip}
              />
            )}
            {statusFilter && (
              <Chip
                label={`Status: ${statusFilter}`}
                onDelete={() => setStatusFilter('')}
                size="small"
                className={statusFilter === 'active' ? styles.statusChipActive : styles.statusChipInactive}
              />
            )}
          </Box>
        </Box>
      </Paper>
    </motion.div>
  )
}

export default EmployeeFilters 