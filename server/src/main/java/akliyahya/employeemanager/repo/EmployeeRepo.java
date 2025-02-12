package akliyahya.employeemanager.repo;

import akliyahya.employeemanager.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepo extends JpaRepository<Employee, String> {
}
