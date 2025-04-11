package orderservice.controller;

import orderservice.service.OrderService;
import orderservice.mapper.OrderMapper;
import orderservice.dto.OrderRequest;
import orderservice.dto.OrderResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page; 
import org.springframework.http.HttpStatus;

import lombok.RequiredArgsConstructor;
import jakarta.validation.Valid; 

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService service;
    private final OrderMapper mapper;

    @PostMapping
    public ResponseEntity<OrderResponse> create(
        @Valid @RequestBody OrderRequest req) {
      var order = service.create(mapper.toEntity(req));
      return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(mapper.toResponse(order));
    }

    @GetMapping
    public ResponseEntity<Page<OrderResponse>> list(
        @RequestParam(defaultValue="0") int page,
        @RequestParam(defaultValue="10") int size,
        @RequestParam(defaultValue="createdAt") String sortBy,
        @RequestParam(defaultValue="desc") String dir,
        @RequestParam(required=false) String customer) {

      var orders = service.list(page, size, sortBy, dir, customer);
      var dtoPage = orders.map(mapper::toResponse);
      return ResponseEntity.ok(dtoPage);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderResponse> update(
        @PathVariable Long id,
        @Valid @RequestBody OrderRequest req) {
      var updated = service.update(id, mapper.toEntity(req));
      return ResponseEntity.ok(mapper.toResponse(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
      service.delete(id);
      return ResponseEntity.noContent().build();
    }
}