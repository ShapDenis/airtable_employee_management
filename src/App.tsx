import {Container, Box} from '@mui/material'
import EmployeeList from './components/EmployeeList/EmployeeList.tsx'

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `
          linear-gradient(135deg, 
            #f8fafc 0%, 
            #e2e8f0 25%, 
            #cbd5e1 50%, 
            #e2e8f0 75%, 
            #f8fafc 100%
          )
        `,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(226, 232, 240, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(203, 213, 225, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(248, 250, 252, 0.4) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="xl" sx={{position: 'relative', zIndex: 1}}>
        <Box sx={{py: 4}}>
          <EmployeeList/>
        </Box>
      </Container>
    </Box>
  )
}

export default App 