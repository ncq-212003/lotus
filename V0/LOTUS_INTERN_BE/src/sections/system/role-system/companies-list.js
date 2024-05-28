import { Box, List, ListItemButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const CompaniesList = ({ handleDepartmentSelect }) => {
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [expandedCompany, setExpandedCompany] = useState('');

    const handleCompanyClick = (company) => {
        if (company === expandedCompany) {
            setExpandedCompany('');
            setSelectedCompany('');
            setSelectedDepartment('');
        } else {
            setExpandedCompany(company);
            setSelectedCompany(company);
        }
    };

    const handleDepartmentClick = (department) => {
        setSelectedDepartment(department);
        handleDepartmentSelect(department);
    };

    const companies = [
        {
            name: 'Công ty X',
            departments: ['Kế toán', 'Nhân sự', 'Kỹ thuật']
        },
        {
            name: 'Công ty Y',
            departments: ['Marketing', 'Quản lý sản xuất', 'Kinh doanh']
        },
        {
            name: 'Công ty Z',
            departments: ['Tài chính', 'Logistics', 'Chăm sóc khách hàng']
        }
    ];

    return (
        <Box sx={{ border: 'solid 1px', borderRadius: '6px', borderColor: 'rgba(0, 0, 0, 0.1)' }}>
            <Typography sx={{ textAlign: 'center', marginTop: '4px', marginBottom: '4px', padding: '8px', fontWeight: 500 }}>
                Công ty - Phòng ban
            </Typography>
            <List component="nav">
                {companies.map((company, index) => (
                    <React.Fragment key={company.name}>
                        <ListItemButton
                            selected={company.name === selectedCompany}
                            onClick={() => handleCompanyClick(company.name)}
                            sx={{
                                borderTop: index === 0 ? '1px solid' : 'none',
                                borderBottom: (index === companies.length - 1) ? 'none' : '1px solid',
                                borderColor: 'rgba(0, 0, 0, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography variant="body1">
                                {company.name}
                            </Typography>
                            {expandedCompany === company.name ? (
                                <ExpandLessIcon />
                            ) : (
                                <ExpandMoreIcon />
                            )}
                        </ListItemButton>
                        {company.name === expandedCompany && (
                            <List sx={{ paddingTop: 0, paddingBottom: 0 }}>
                                {company.departments.map((department, departmentIndex) => (
                                    <ListItemButton
                                        key={departmentIndex}
                                        selected={department === selectedDepartment}
                                        onClick={() => handleDepartmentClick(department)}
                                        sx={{
                                            backgroundColor: department === selectedDepartment ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                                            borderBottom: (departmentIndex === company.departments.length - 1) ? 'none' : '1px solid',
                                            borderColor: 'rgba(0, 0, 0, 0.1)',
                                        }}
                                    >
                                        {department === selectedDepartment ? (
                                            <Typography variant="body1" sx={{ color: 'primary.main' }}>✓</Typography>
                                        ) : null}
                                        <Typography variant="body2" sx={{ pl: 4 }}>
                                            {department}
                                        </Typography>
                                    </ListItemButton>
                                ))}
                            </List>
                        )}
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
};

export default CompaniesList;
