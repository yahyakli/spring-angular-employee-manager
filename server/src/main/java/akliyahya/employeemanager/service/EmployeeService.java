package akliyahya.employeemanager.service;

import akliyahya.employeemanager.model.Employee;
import akliyahya.employeemanager.repo.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    private  final EmployeeRepo employeeRepo;

    @Autowired
    public EmployeeService(EmployeeRepo employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    public Employee addEmployee(Employee employee) {
        return employeeRepo.save(employee);
    }

    public Optional<Employee> getEmployee(String id){
        return employeeRepo.findById(id);
    }

    public List<Employee> getAllEmployees(){
        List<Employee> employees = employeeRepo.findAll();
        return employees;
    }

    public Employee updateEmployee(Employee employee, String id) {
        Employee findingEmployee = employeeRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));

        findingEmployee.setName(employee.getName());
        findingEmployee.setEmail(employee.getEmail());
        findingEmployee.setPhone(employee.getPhone());
        findingEmployee.setImageUrl(employee.getImageUrl());
        findingEmployee.setJobTitle(employee.getJobTitle());

        return employeeRepo.save(findingEmployee);
    }

    public Void deleteEmployee(String id) {
        employeeRepo.deleteById(id);
        return null;
    }

}
