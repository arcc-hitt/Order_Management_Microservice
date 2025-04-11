package orderservice.repository;

import orderservice.model.Order;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order,Long> {
    Page<Order> findByCustomerNameContainingIgnoreCase(
        String customer, Pageable pageable);
  }