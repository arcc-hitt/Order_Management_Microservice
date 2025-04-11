package orderservice.service;

import orderservice.exception.ResourceNotFoundException;
import orderservice.model.Order;
import orderservice.repository.OrderRepository;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository repo;

    public Order create(Order order) {
      return repo.save(order);
    }

    public Page<Order> list(int page, int size, String sortBy,
                            String dir, String customer) {
      var sort = Sort.by(Sort.Direction.fromString(dir), sortBy);
      var pageReq = PageRequest.of(page, size, sort);
      if (customer != null) {
        return repo.findByCustomerNameContainingIgnoreCase(customer, pageReq);
      }
      return repo.findAll(pageReq);
    }

    public Order update(Long id, Order newData) {
      var existing = repo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Order", id));
      // copy fields
      existing.setCustomerName(newData.getCustomerName());
      existing.setItemName(newData.getItemName());
      existing.setQuantity(newData.getQuantity());
      existing.setPrice(newData.getPrice());
      return repo.save(existing);
    }

    public void delete(Long id) {
      repo.deleteById(id);
    }
}
