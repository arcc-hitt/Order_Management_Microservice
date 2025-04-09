package orderservice.service;

import orderservice.model.Order;
import orderservice.repository.OrderRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OrderService {
    private final OrderRepository repo;
    public OrderService(OrderRepository repo) { this.repo = repo; }
    public Order create(Order order) { return repo.save(order); }
    public List<Order> list() { return repo.findAll(); }
}