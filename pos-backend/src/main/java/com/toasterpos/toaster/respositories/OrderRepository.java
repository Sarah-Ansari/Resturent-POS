package com.toasterpos.toaster.respositories;

import com.toasterpos.toaster.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("select or from Order or where completed = false")
    List<Order> findWaitingOrder();

    @Query("select or from Order or where completed = true")
    List<Order> findCompletedOrder();
}
